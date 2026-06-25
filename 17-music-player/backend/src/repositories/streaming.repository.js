'use strict';

const { query, pool } = require('../config/db');

const getSongById = async (songId) => {
  const rows = await query(
    `
      SELECT
        s.id,
        s.title,
        s.slug,
        s.duration_seconds,
        s.source_type,
        s.file_path,
        s.external_url,
        s.cover_image_url,
        s.is_active,
        ar.name AS artist_name,
        al.title AS album_title
      FROM songs s
      INNER JOIN artists ar ON ar.id = s.artist_id
      LEFT JOIN albums al ON al.id = s.album_id
      WHERE s.id = ?
      LIMIT 1
    `,
    [songId]
  );

  return rows[0] || null;
};

const ensurePlaybackSession = async (userId) => {
  await query(
    `
      INSERT INTO playback_sessions (user_id)
      VALUES (?)
      ON DUPLICATE KEY UPDATE user_id = user_id
    `,
    [userId]
  );
};

const getPlaybackSession = async (userId) => {
  await ensurePlaybackSession(userId);

  const rows = await query(
    `
      SELECT
        ps.id,
        ps.user_id,
        ps.current_song_id,
        ps.status,
        ps.current_position_seconds,
        ps.volume_percent,
        ps.shuffle_enabled,
        ps.repeat_mode,
        ps.queue_version,
        ps.updated_at,
        ps.created_at,
        s.title AS current_song_title,
        s.slug AS current_song_slug
      FROM playback_sessions ps
      LEFT JOIN songs s ON s.id = ps.current_song_id
      WHERE ps.user_id = ?
      LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

const updatePlaybackSession = async (userId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE playback_sessions SET ${setClause} WHERE user_id = ?`, [...values, userId]);
};

const listQueue = async (userId) => {
  return query(
    `
      SELECT
        q.song_id,
        q.position,
        q.source_type,
        q.source_ref,
        s.title,
        s.slug,
        s.duration_seconds,
        s.source_type AS song_source_type,
        s.file_path,
        s.external_url,
        s.cover_image_url,
        s.is_active,
        ar.name AS artist_name
      FROM playback_queue q
      INNER JOIN songs s ON s.id = q.song_id
      INNER JOIN artists ar ON ar.id = s.artist_id
      WHERE q.user_id = ?
      ORDER BY q.position ASC
    `,
    [userId]
  );
};

const countQueue = async (userId) => {
  const rows = await query('SELECT COUNT(*) AS total FROM playback_queue WHERE user_id = ?', [userId]);
  return rows[0]?.total || 0;
};

const findQueueItem = async (userId, songId) => {
  const rows = await query(
    'SELECT id, user_id, song_id, position FROM playback_queue WHERE user_id = ? AND song_id = ? LIMIT 1',
    [userId, songId]
  );

  return rows[0] || null;
};

const shiftQueueFrom = async (userId, position) => {
  await query(
    'UPDATE playback_queue SET position = position + 1 WHERE user_id = ? AND position >= ?',
    [userId, position]
  );
};

const addQueueItem = async ({ userId, songId, position, sourceType, sourceRef }) => {
  await query(
    `
      INSERT INTO playback_queue (user_id, song_id, position, source_type, source_ref)
      VALUES (?, ?, ?, ?, ?)
    `,
    [userId, songId, position, sourceType, sourceRef || null]
  );
};

const removeQueueItem = async (userId, songId) => {
  const item = await findQueueItem(userId, songId);
  if (!item) {
    return false;
  }

  await query('DELETE FROM playback_queue WHERE user_id = ? AND song_id = ?', [userId, songId]);
  await query('UPDATE playback_queue SET position = position - 1 WHERE user_id = ? AND position > ?', [userId, item.position]);
  return true;
};

const clearQueue = async (userId) => {
  await query('DELETE FROM playback_queue WHERE user_id = ?', [userId]);
};

const reorderQueue = async (userId, orderedSongIds) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (let i = 0; i < orderedSongIds.length; i += 1) {
      await connection.execute(
        'UPDATE playback_queue SET position = ? WHERE user_id = ? AND song_id = ?',
        [i + 1, userId, orderedSongIds[i]]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const logPlayback = async ({ userId, songId, playSource, contextRef }) => {
  await query(
    `
      INSERT INTO recently_played (user_id, song_id, play_source, context_ref, played_at)
      VALUES (?, ?, ?, ?, NOW())
    `,
    [userId, songId, playSource || 'library', contextRef || null]
  );

  await query(
    `
      INSERT INTO song_views (song_id, user_id, viewed_at, source)
      VALUES (?, ?, NOW(), ?)
    `,
    [songId, userId, playSource || 'library']
  );
};

module.exports = {
  getSongById,
  ensurePlaybackSession,
  getPlaybackSession,
  updatePlaybackSession,
  listQueue,
  countQueue,
  findQueueItem,
  shiftQueueFrom,
  addQueueItem,
  removeQueueItem,
  clearQueue,
  reorderQueue,
  logPlayback
};
