'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const slugify = require('../utils/slugify');
const songRepository = require('../repositories/song.repository');

const toBoolean = (value, fallback = null) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value).toLowerCase().trim();
  if (normalized === 'true' || normalized === '1') {
    return true;
  }
  if (normalized === 'false' || normalized === '0') {
    return false;
  }

  return fallback;
};

const toNullable = (value) => {
  return value === undefined ? undefined : value || null;
};

const mapSong = (song) => ({
  id: song.id,
  title: song.title,
  slug: song.slug,
  durationSeconds: song.duration_seconds,
  sourceType: song.source_type,
  filePath: song.file_path,
  externalUrl: song.external_url,
  coverImageUrl: song.cover_image_url,
  trackNumber: song.track_number,
  discNumber: song.disc_number,
  playbackBitrateKbps: song.playback_bitrate_kbps,
  isExplicit: Boolean(song.is_explicit),
  releaseDate: song.release_date,
  isActive: Boolean(song.is_active),
  artist: {
    id: song.artist_id,
    name: song.artist_name
  },
  album: song.album_id
    ? {
        id: song.album_id,
        title: song.album_title
      }
    : null,
  genre: {
    id: song.genre_id,
    name: song.genre_name
  },
  createdBy: song.created_by_user_id
    ? {
        id: song.created_by_user_id,
        username: song.created_by_username
      }
    : null,
  createdAt: song.created_at,
  updatedAt: song.updated_at
});

const ensureReferences = async ({ artistId, albumId, genreId }) => {
  const [hasArtist, hasAlbum, hasGenre] = await Promise.all([
    songRepository.existsArtist(artistId),
    songRepository.existsAlbum(albumId),
    songRepository.existsGenre(genreId)
  ]);

  if (!hasArtist) {
    throw new AppError('Artist not found', httpStatus.BAD_REQUEST);
  }

  if (!hasAlbum) {
    throw new AppError('Album not found', httpStatus.BAD_REQUEST);
  }

  if (!hasGenre) {
    throw new AppError('Genre not found', httpStatus.BAD_REQUEST);
  }
};

const ensureSourcePayload = ({ sourceType, filePath, externalUrl }) => {
  if (sourceType === 'local' && !filePath) {
    throw new AppError('filePath is required for local source type', httpStatus.BAD_REQUEST);
  }

  if (sourceType === 'external' && !externalUrl) {
    throw new AppError('externalUrl is required for external source type', httpStatus.BAD_REQUEST);
  }
};

const ensureUniqueSlug = async (title, currentSongId = null) => {
  const base = slugify(title) || 'song';
  let slug = base;

  let counter = 0;
  while (counter < 20) {
    const found = await songRepository.findBySlug(slug);
    if (!found || found.id === currentSongId) {
      return slug;
    }
    counter += 1;
    slug = `${base}-${counter}`;
  }

  return `${base}-${Date.now()}`;
};

const buildWhere = (filters) => {
  const clauses = [];
  const values = [];

  if (filters.search) {
    clauses.push('(s.title LIKE ? OR ar.name LIKE ? OR COALESCE(al.title, \"\") LIKE ?)');
    const term = `%${filters.search}%`;
    values.push(term, term, term);
  }

  if (filters.artistId) {
    clauses.push('s.artist_id = ?');
    values.push(filters.artistId);
  }

  if (filters.albumId) {
    clauses.push('s.album_id = ?');
    values.push(filters.albumId);
  }

  if (filters.genreId) {
    clauses.push('s.genre_id = ?');
    values.push(filters.genreId);
  }

  if (filters.sourceType) {
    clauses.push('s.source_type = ?');
    values.push(filters.sourceType);
  }

  if (filters.isActive !== null) {
    clauses.push('s.is_active = ?');
    values.push(filters.isActive ? 1 : 0);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values
  };
};

const listSongs = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const filters = {
    search: queryParams.search ? String(queryParams.search).trim() : null,
    artistId: queryParams.artistId ? Number(queryParams.artistId) : null,
    albumId: queryParams.albumId ? Number(queryParams.albumId) : null,
    genreId: queryParams.genreId ? Number(queryParams.genreId) : null,
    sourceType: queryParams.sourceType ? String(queryParams.sourceType).trim() : null,
    isActive: toBoolean(queryParams.isActive, null)
  };

  const { whereClause, values } = buildWhere(filters);

  const [items, total] = await Promise.all([
    songRepository.list({
      whereClause,
      values,
      sortBy: queryParams.sortBy,
      sortOrder: String(queryParams.sortOrder || 'DESC').toUpperCase(),
      limit,
      offset
    }),
    songRepository.count({ whereClause, values })
  ]);

  return {
    items: items.map(mapSong),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1)
    }
  };
};

const getSongById = async (songId) => {
  const song = await songRepository.findById(songId);
  if (!song) {
    throw new AppError('Song not found', httpStatus.NOT_FOUND);
  }

  return mapSong(song);
};

const createSong = async (payload, actor) => {
  await ensureReferences({
    artistId: payload.artistId,
    albumId: payload.albumId,
    genreId: payload.genreId
  });

  ensureSourcePayload(payload);

  const slug = await ensureUniqueSlug(payload.title);

  const songId = await songRepository.create({
    artistId: Number(payload.artistId),
    albumId: payload.albumId ? Number(payload.albumId) : null,
    genreId: Number(payload.genreId),
    createdByUserId: actor.userId,
    title: payload.title.trim(),
    slug,
    durationSeconds: Number(payload.durationSeconds),
    sourceType: payload.sourceType,
    filePath: payload.sourceType === 'local' ? payload.filePath : null,
    externalUrl: payload.sourceType === 'external' ? payload.externalUrl : null,
    coverImageUrl: toNullable(payload.coverImageUrl),
    trackNumber: payload.trackNumber ? Number(payload.trackNumber) : null,
    discNumber: payload.discNumber ? Number(payload.discNumber) : null,
    playbackBitrateKbps: payload.playbackBitrateKbps ? Number(payload.playbackBitrateKbps) : null,
    isExplicit: toBoolean(payload.isExplicit, false) ? 1 : 0,
    releaseDate: toNullable(payload.releaseDate),
    isActive: toBoolean(payload.isActive, true) ? 1 : 0
  });

  return getSongById(songId);
};

const updateSong = async (songId, payload) => {
  const existing = await songRepository.findById(songId);
  if (!existing) {
    throw new AppError('Song not found', httpStatus.NOT_FOUND);
  }

  const sourceType = payload.sourceType || existing.source_type;
  const filePath = payload.filePath !== undefined ? payload.filePath : existing.file_path;
  const externalUrl = payload.externalUrl !== undefined ? payload.externalUrl : existing.external_url;

  ensureSourcePayload({ sourceType, filePath, externalUrl });

  const artistId = payload.artistId !== undefined ? Number(payload.artistId) : existing.artist_id;
  const albumId = payload.albumId !== undefined ? (payload.albumId ? Number(payload.albumId) : null) : existing.album_id;
  const genreId = payload.genreId !== undefined ? Number(payload.genreId) : existing.genre_id;

  await ensureReferences({ artistId, albumId, genreId });

  const fields = {};

  if (payload.title !== undefined) {
    fields.title = payload.title.trim();
    fields.slug = await ensureUniqueSlug(payload.title, songId);
  }

  if (payload.artistId !== undefined) fields.artist_id = artistId;
  if (payload.albumId !== undefined) fields.album_id = albumId;
  if (payload.genreId !== undefined) fields.genre_id = genreId;
  if (payload.durationSeconds !== undefined) fields.duration_seconds = Number(payload.durationSeconds);
  if (payload.sourceType !== undefined) fields.source_type = sourceType;
  if (payload.filePath !== undefined) fields.file_path = sourceType === 'local' ? payload.filePath : null;
  if (payload.externalUrl !== undefined) fields.external_url = sourceType === 'external' ? payload.externalUrl : null;
  if (payload.coverImageUrl !== undefined) fields.cover_image_url = toNullable(payload.coverImageUrl);
  if (payload.trackNumber !== undefined) fields.track_number = payload.trackNumber ? Number(payload.trackNumber) : null;
  if (payload.discNumber !== undefined) fields.disc_number = payload.discNumber ? Number(payload.discNumber) : null;
  if (payload.playbackBitrateKbps !== undefined) {
    fields.playback_bitrate_kbps = payload.playbackBitrateKbps ? Number(payload.playbackBitrateKbps) : null;
  }
  if (payload.isExplicit !== undefined) fields.is_explicit = toBoolean(payload.isExplicit, false) ? 1 : 0;
  if (payload.releaseDate !== undefined) fields.release_date = toNullable(payload.releaseDate);
  if (payload.isActive !== undefined) fields.is_active = toBoolean(payload.isActive, true) ? 1 : 0;

  await songRepository.update(songId, fields);

  return getSongById(songId);
};

const updateSongStatus = async (songId, isActive) => {
  const song = await songRepository.findById(songId);
  if (!song) {
    throw new AppError('Song not found', httpStatus.NOT_FOUND);
  }

  await songRepository.setActiveStatus(songId, isActive ? 1 : 0);
  return getSongById(songId);
};

const deleteSong = async (songId) => {
  const song = await songRepository.findById(songId);
  if (!song) {
    throw new AppError('Song not found', httpStatus.NOT_FOUND);
  }

  await songRepository.setActiveStatus(songId, 0);
};

module.exports = {
  listSongs,
  getSongById,
  createSong,
  updateSong,
  updateSongStatus,
  deleteSong
};
