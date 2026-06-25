'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const ROLES = require('../constants/roles');
const playlistRepository = require('../repositories/playlist.repository');

const mapPlaylist = (row) => ({
  id: row.id,
  userId: row.user_id,
  name: row.name,
  description: row.description,
  coverImageUrl: row.cover_image_url,
  isPublic: Boolean(row.is_public),
  songCount: Number(row.song_count || 0),
  ownerUsername: row.owner_username || null,
  ownerFullName: row.owner_full_name || null,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const mapPlaylistSong = (row) => ({
  songId: row.song_id,
  position: row.position,
  addedAt: row.added_at,
  title: row.title,
  slug: row.slug,
  durationSeconds: row.duration_seconds,
  sourceType: row.source_type,
  filePath: row.file_path,
  externalUrl: row.external_url,
  coverImageUrl: row.cover_image_url,
  artistName: row.artist_name,
  albumTitle: row.album_title,
  genreName: row.genre_name
});

const canManagePlaylist = (playlist, actor) => {
  return actor.role === ROLES.ADMIN || Number(playlist.user_id) === Number(actor.userId);
};

const canViewPlaylist = (playlist, actor) => {
  if (playlist.is_public) {
    return true;
  }

  if (!actor) {
    return false;
  }

  return canManagePlaylist(playlist, actor);
};

const ensurePlaylist = async (playlistId) => {
  const playlist = await playlistRepository.findPlaylistById(playlistId);
  if (!playlist) {
    throw new AppError('Playlist not found', httpStatus.NOT_FOUND);
  }
  return playlist;
};

const listMyPlaylists = async (actor, queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const search = queryParams.search ? String(queryParams.search).trim() : null;

  const result = await playlistRepository.listPlaylistsByOwner({
    userId: actor.userId,
    page,
    limit,
    search
  });

  return {
    items: result.items.map(mapPlaylist),
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.max(Math.ceil(result.total / limit), 1)
    }
  };
};

const listPublicPlaylists = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const search = queryParams.search ? String(queryParams.search).trim() : null;

  const result = await playlistRepository.listPublicPlaylists({ page, limit, search });

  return {
    items: result.items.map(mapPlaylist),
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.max(Math.ceil(result.total / limit), 1)
    }
  };
};

const getPlaylistById = async (playlistId, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canViewPlaylist(playlist, actor)) {
    throw new AppError('Playlist is private', httpStatus.FORBIDDEN);
  }

  const songs = await playlistRepository.listPlaylistSongs(playlistId);

  return {
    playlist: mapPlaylist(playlist),
    songs: songs.map(mapPlaylistSong)
  };
};

const createPlaylist = async (payload, actor) => {
  const playlistId = await playlistRepository.createPlaylist({
    userId: actor.userId,
    name: payload.name.trim(),
    description: payload.description || null,
    coverImageUrl: payload.coverImageUrl || null,
    isPublic: Boolean(payload.isPublic)
  });

  const playlist = await ensurePlaylist(playlistId);
  return mapPlaylist(playlist);
};

const updatePlaylist = async (playlistId, payload, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canManagePlaylist(playlist, actor)) {
    throw new AppError('Forbidden to modify this playlist', httpStatus.FORBIDDEN);
  }

  const fields = {};

  if (payload.name !== undefined) fields.name = payload.name.trim();
  if (payload.description !== undefined) fields.description = payload.description || null;
  if (payload.coverImageUrl !== undefined) fields.cover_image_url = payload.coverImageUrl || null;
  if (payload.isPublic !== undefined) fields.is_public = payload.isPublic ? 1 : 0;

  await playlistRepository.updatePlaylist(playlistId, fields);

  const updated = await ensurePlaylist(playlistId);
  return mapPlaylist(updated);
};

const deletePlaylist = async (playlistId, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canManagePlaylist(playlist, actor)) {
    throw new AppError('Forbidden to delete this playlist', httpStatus.FORBIDDEN);
  }

  await playlistRepository.deletePlaylist(playlistId);
};

const addSong = async (playlistId, payload, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canManagePlaylist(playlist, actor)) {
    throw new AppError('Forbidden to modify this playlist', httpStatus.FORBIDDEN);
  }

  const hasSong = await playlistRepository.isSongActive(payload.songId);
  if (!hasSong) {
    throw new AppError('Song not found or inactive', httpStatus.BAD_REQUEST);
  }

  const existing = await playlistRepository.findPlaylistSong(playlistId, payload.songId);
  if (existing) {
    throw new AppError('Song already added to playlist', httpStatus.CONFLICT);
  }

  const total = await playlistRepository.countPlaylistSongs(playlistId);
  let position = payload.position ? Number(payload.position) : total + 1;
  if (position < 1) {
    position = 1;
  }
  if (position > total + 1) {
    position = total + 1;
  }

  if (position <= total) {
    await playlistRepository.shiftPositionsFrom(playlistId, position);
  }

  await playlistRepository.addSongToPlaylist({
    playlistId,
    songId: payload.songId,
    position,
    addedByUserId: actor.userId
  });

  const songs = await playlistRepository.listPlaylistSongs(playlistId);
  return songs.map(mapPlaylistSong);
};

const removeSong = async (playlistId, songId, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canManagePlaylist(playlist, actor)) {
    throw new AppError('Forbidden to modify this playlist', httpStatus.FORBIDDEN);
  }

  const removed = await playlistRepository.removeSongFromPlaylist(playlistId, songId);
  if (!removed) {
    throw new AppError('Song is not in playlist', httpStatus.NOT_FOUND);
  }

  const songs = await playlistRepository.listPlaylistSongs(playlistId);
  return songs.map(mapPlaylistSong);
};

const reorderSongs = async (playlistId, orderedSongIds, actor) => {
  const playlist = await ensurePlaylist(playlistId);

  if (!canManagePlaylist(playlist, actor)) {
    throw new AppError('Forbidden to modify this playlist', httpStatus.FORBIDDEN);
  }

  const currentSongs = await playlistRepository.listPlaylistSongs(playlistId);
  const currentIds = currentSongs.map((song) => Number(song.song_id));
  const requestedIds = orderedSongIds.map((id) => Number(id));

  if (currentIds.length !== requestedIds.length) {
    throw new AppError('orderedSongIds must include all playlist songs exactly once', httpStatus.BAD_REQUEST);
  }

  const currentSet = new Set(currentIds);
  for (const id of requestedIds) {
    if (!currentSet.has(id)) {
      throw new AppError('orderedSongIds contains invalid song id', httpStatus.BAD_REQUEST);
    }
  }

  const uniqueSet = new Set(requestedIds);
  if (uniqueSet.size !== requestedIds.length) {
    throw new AppError('orderedSongIds contains duplicate song ids', httpStatus.BAD_REQUEST);
  }

  await playlistRepository.reorderPlaylistSongs(playlistId, requestedIds);

  const songs = await playlistRepository.listPlaylistSongs(playlistId);
  return songs.map(mapPlaylistSong);
};

module.exports = {
  listMyPlaylists,
  listPublicPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  reorderSongs
};
