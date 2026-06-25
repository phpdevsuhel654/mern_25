'use strict';

const path = require('path');

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const streamRepo = require('../repositories/streaming.repository');
const env = require('../config/env');

const mapSong = (song) => ({
  id: song.id,
  title: song.title,
  slug: song.slug,
  durationSeconds: song.duration_seconds,
  sourceType: song.source_type,
  filePath: song.file_path,
  externalUrl: song.external_url,
  coverImageUrl: song.cover_image_url,
  artistName: song.artist_name,
  albumTitle: song.album_title
});

const mapQueueItem = (row) => ({
  songId: row.song_id,
  position: row.position,
  sourceType: row.source_type,
  sourceRef: row.source_ref,
  title: row.title,
  slug: row.slug,
  durationSeconds: row.duration_seconds,
  songSourceType: row.song_source_type,
  filePath: row.file_path,
  externalUrl: row.external_url,
  coverImageUrl: row.cover_image_url,
  isActive: Boolean(row.is_active),
  artistName: row.artist_name
});

const resolveSongForPlayback = async (songId) => {
  const song = await streamRepo.getSongById(songId);

  if (!song || !song.is_active) {
    throw new AppError('Song not found or inactive', httpStatus.NOT_FOUND);
  }

  return song;
};

const getPlaybackState = async (userId) => {
  const [session, queue] = await Promise.all([
    streamRepo.getPlaybackSession(userId),
    streamRepo.listQueue(userId)
  ]);

  return {
    session: {
      userId: session.user_id,
      currentSongId: session.current_song_id,
      currentSongTitle: session.current_song_title,
      currentSongSlug: session.current_song_slug,
      status: session.status,
      currentPositionSeconds: session.current_position_seconds,
      volumePercent: session.volume_percent,
      shuffleEnabled: Boolean(session.shuffle_enabled),
      repeatMode: session.repeat_mode,
      queueVersion: session.queue_version,
      updatedAt: session.updated_at,
      createdAt: session.created_at
    },
    queue: queue.map(mapQueueItem)
  };
};

const getStreamSource = async (songId, userId) => {
  const song = await resolveSongForPlayback(songId);

  await streamRepo.logPlayback({
    userId,
    songId,
    playSource: 'library',
    contextRef: null
  });

  const response = {
    song: mapSong(song),
    stream: {
      mode: song.source_type,
      url: null
    }
  };

  if (song.source_type === 'external') {
    response.stream.url = song.external_url;
  } else {
    response.stream.url = `${env.apiPrefix}/stream/files/${song.id}`;
  }

  return response;
};

const playSong = async ({ userId, songId, playSource, contextRef, positionSeconds }) => {
  const song = await resolveSongForPlayback(songId);

  await streamRepo.ensurePlaybackSession(userId);
  await streamRepo.updatePlaybackSession(userId, {
    current_song_id: song.id,
    status: 'playing',
    current_position_seconds: Math.max(Number(positionSeconds) || 0, 0)
  });

  await streamRepo.logPlayback({
    userId,
    songId: song.id,
    playSource: playSource || 'library',
    contextRef: contextRef || null
  });

  return {
    status: 'playing',
    song: mapSong(song)
  };
};

const pausePlayback = async (userId, positionSeconds) => {
  const session = await streamRepo.getPlaybackSession(userId);

  if (!session.current_song_id) {
    throw new AppError('No active song to pause', httpStatus.BAD_REQUEST);
  }

  await streamRepo.updatePlaybackSession(userId, {
    status: 'paused',
    current_position_seconds: Math.max(Number(positionSeconds) || session.current_position_seconds || 0, 0)
  });

  return { status: 'paused' };
};

const resumePlayback = async (userId) => {
  const session = await streamRepo.getPlaybackSession(userId);

  if (!session.current_song_id) {
    throw new AppError('No active song to resume', httpStatus.BAD_REQUEST);
  }

  await streamRepo.updatePlaybackSession(userId, {
    status: 'playing'
  });

  return { status: 'playing' };
};

const setVolume = async (userId, volumePercent) => {
  const value = Number(volumePercent);
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new AppError('volumePercent must be between 0 and 100', httpStatus.BAD_REQUEST);
  }

  await streamRepo.ensurePlaybackSession(userId);
  await streamRepo.updatePlaybackSession(userId, {
    volume_percent: value
  });

  return { volumePercent: value };
};

const setPlaybackMode = async (userId, { shuffleEnabled, repeatMode }) => {
  const fields = {};

  if (shuffleEnabled !== undefined) {
    fields.shuffle_enabled = shuffleEnabled ? 1 : 0;
  }

  if (repeatMode !== undefined) {
    fields.repeat_mode = repeatMode;
  }

  await streamRepo.ensurePlaybackSession(userId);
  await streamRepo.updatePlaybackSession(userId, fields);

  return getPlaybackState(userId);
};

const addToQueue = async (userId, payload) => {
  const song = await resolveSongForPlayback(payload.songId);

  const exists = await streamRepo.findQueueItem(userId, song.id);
  if (exists) {
    throw new AppError('Song already exists in queue', httpStatus.CONFLICT);
  }

  const total = await streamRepo.countQueue(userId);
  let position = payload.position ? Number(payload.position) : total + 1;

  if (position < 1) {
    position = 1;
  }

  if (position > total + 1) {
    position = total + 1;
  }

  if (position <= total) {
    await streamRepo.shiftQueueFrom(userId, position);
  }

  await streamRepo.addQueueItem({
    userId,
    songId: song.id,
    position,
    sourceType: payload.sourceType || 'manual',
    sourceRef: payload.sourceRef || null
  });

  const queue = await streamRepo.listQueue(userId);
  return queue.map(mapQueueItem);
};

const removeFromQueue = async (userId, songId) => {
  const removed = await streamRepo.removeQueueItem(userId, songId);

  if (!removed) {
    throw new AppError('Song not found in queue', httpStatus.NOT_FOUND);
  }

  const queue = await streamRepo.listQueue(userId);
  return queue.map(mapQueueItem);
};

const clearQueue = async (userId) => {
  await streamRepo.clearQueue(userId);
  return [];
};

const reorderQueue = async (userId, orderedSongIds) => {
  const queue = await streamRepo.listQueue(userId);
  const currentIds = queue.map((item) => Number(item.song_id));
  const requestedIds = orderedSongIds.map((id) => Number(id));

  if (currentIds.length !== requestedIds.length) {
    throw new AppError('orderedSongIds must include all queue songs exactly once', httpStatus.BAD_REQUEST);
  }

  const currentSet = new Set(currentIds);
  for (const id of requestedIds) {
    if (!currentSet.has(id)) {
      throw new AppError('orderedSongIds contains invalid song id', httpStatus.BAD_REQUEST);
    }
  }

  if (new Set(requestedIds).size !== requestedIds.length) {
    throw new AppError('orderedSongIds contains duplicate song ids', httpStatus.BAD_REQUEST);
  }

  await streamRepo.reorderQueue(userId, requestedIds);

  const updatedQueue = await streamRepo.listQueue(userId);
  return updatedQueue.map(mapQueueItem);
};

const moveTrack = async (userId, direction) => {
  const session = await streamRepo.getPlaybackSession(userId);
  const queue = await streamRepo.listQueue(userId);

  if (!queue.length) {
    throw new AppError('Queue is empty', httpStatus.BAD_REQUEST);
  }

  let currentIndex = -1;
  if (session.current_song_id) {
    currentIndex = queue.findIndex((item) => Number(item.song_id) === Number(session.current_song_id));
  }

  if (currentIndex === -1) {
    currentIndex = 0;
  }

  let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex >= queue.length) {
    if (session.repeat_mode === 'all') {
      nextIndex = 0;
    } else {
      throw new AppError('No next song in queue', httpStatus.BAD_REQUEST);
    }
  }

  if (nextIndex < 0) {
    if (session.repeat_mode === 'all') {
      nextIndex = queue.length - 1;
    } else {
      throw new AppError('No previous song in queue', httpStatus.BAD_REQUEST);
    }
  }

  const target = queue[nextIndex];
  await streamRepo.updatePlaybackSession(userId, {
    current_song_id: target.song_id,
    status: 'playing',
    current_position_seconds: 0
  });

  await streamRepo.logPlayback({
    userId,
    songId: target.song_id,
    playSource: 'playlist',
    contextRef: 'queue'
  });

  const song = await resolveSongForPlayback(target.song_id);

  return {
    status: 'playing',
    song: mapSong(song)
  };
};

const resolveLocalFilePath = async (songId) => {
  const song = await resolveSongForPlayback(songId);

  if (song.source_type !== 'local') {
    throw new AppError('Song is not a local media source', httpStatus.BAD_REQUEST);
  }

  const mediaRoot = env.mediaRoot;
  const normalized = path.normalize(song.file_path || '').replace(/^([.][.][/\\])+/, '');
  const absolute = path.resolve(mediaRoot, normalized);
  const rootAbsolute = path.resolve(mediaRoot);

  if (!absolute.startsWith(rootAbsolute)) {
    throw new AppError('Invalid media file path', httpStatus.BAD_REQUEST);
  }

  return {
    absolutePath: absolute,
    song: mapSong(song)
  };
};

module.exports = {
  getPlaybackState,
  getStreamSource,
  playSong,
  pausePlayback,
  resumePlayback,
  setVolume,
  setPlaybackMode,
  addToQueue,
  removeFromQueue,
  clearQueue,
  reorderQueue,
  moveTrack,
  resolveLocalFilePath
};
