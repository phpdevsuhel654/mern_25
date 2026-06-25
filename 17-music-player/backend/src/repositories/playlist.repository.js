'use strict';

const { query, pool } = require('../config/db');

const findPlaylistById = async (playlistId) => {
  const rows = await query(
    `
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.description,
        p.cover_image_url,
        p.is_public,
        p.created_at,
        p.updated_at,
        u.username AS owner_username,
        u.full_name AS owner_full_name,
        COUNT(ps.id) AS song_count
      FROM playlists p
      INNER JOIN users u ON u.id = p.user_id
      LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
      WHERE p.id = ?
      GROUP BY p.id, p.user_id, p.name, p.description, p.cover_image_url, p.is_public, p.created_at, p.updated_at, u.username, u.full_name
      LIMIT 1
    `,
    [playlistId]
  );

  return rows[0] || null;
};

const listPlaylistsByOwner = async ({ userId, page, limit, search }) => {
  const offset = (page - 1) * limit;
  const clauses = ['p.user_id = ?'];
  const values = [userId];

  if (search) {
    clauses.push('p.name LIKE ?');
    values.push(`%${search}%`);
  }

  const whereClause = `WHERE ${clauses.join(' AND ')}`;

  const items = await query(
    `
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.description,
        p.cover_image_url,
        p.is_public,
        p.created_at,
        p.updated_at,
        COUNT(ps.id) AS song_count
      FROM playlists p
      LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  const totalRows = await query(
    `
      SELECT COUNT(*) AS total
      FROM playlists p
      ${whereClause}
    `,
    values
  );

  return {
    items,
    total: totalRows[0]?.total || 0
  };
};

const listPublicPlaylists = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;
  const clauses = ['p.is_public = 1'];
  const values = [];

  if (search) {
    clauses.push('p.name LIKE ?');
    values.push(`%${search}%`);
  }

  const whereClause = `WHERE ${clauses.join(' AND ')}`;

  const items = await query(
    `
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.description,
        p.cover_image_url,
        p.is_public,
        p.created_at,
        p.updated_at,
        u.username AS owner_username,
        COUNT(ps.id) AS song_count
      FROM playlists p
      INNER JOIN users u ON u.id = p.user_id
      LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
      ${whereClause}
      GROUP BY p.id, u.username
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  const totalRows = await query(
    `
      SELECT COUNT(*) AS total
      FROM playlists p
      ${whereClause}
    `,
    values
  );

  return {
    items,
    total: totalRows[0]?.total || 0
  };
};

const createPlaylist = async ({ userId, name, description, coverImageUrl, isPublic }) => {
  const result = await query(
    `
      INSERT INTO playlists (user_id, name, description, cover_image_url, is_public)
      VALUES (?, ?, ?, ?, ?)
    `,
    [userId, name, description || null, coverImageUrl || null, isPublic ? 1 : 0]
  );

  return result.insertId;
};

const updatePlaylist = async (playlistId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE playlists SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, playlistId]);
};

const deletePlaylist = async (playlistId) => {
  await query('DELETE FROM playlists WHERE id = ?', [playlistId]);
};

const isSongActive = async (songId) => {
  const rows = await query('SELECT id FROM songs WHERE id = ? AND is_active = 1 LIMIT 1', [songId]);
  return Boolean(rows[0]);
};

const listPlaylistSongs = async (playlistId) => {
  return query(
    `
      SELECT
        ps.song_id,
        ps.position,
        ps.added_at,
        s.title,
        s.slug,
        s.duration_seconds,
        s.source_type,
        s.file_path,
        s.external_url,
        s.cover_image_url,
        ar.name AS artist_name,
        al.title AS album_title,
        g.name AS genre_name
      FROM playlist_songs ps
      INNER JOIN songs s ON s.id = ps.song_id
      INNER JOIN artists ar ON ar.id = s.artist_id
      LEFT JOIN albums al ON al.id = s.album_id
      INNER JOIN genres g ON g.id = s.genre_id
      WHERE ps.playlist_id = ?
      ORDER BY ps.position ASC
    `,
    [playlistId]
  );
};

const findPlaylistSong = async (playlistId, songId) => {
  const rows = await query(
    'SELECT id, playlist_id, song_id, position FROM playlist_songs WHERE playlist_id = ? AND song_id = ? LIMIT 1',
    [playlistId, songId]
  );

  return rows[0] || null;
};

const getMaxPlaylistPosition = async (playlistId) => {
  const rows = await query('SELECT COALESCE(MAX(position), 0) AS max_position FROM playlist_songs WHERE playlist_id = ?', [playlistId]);
  return rows[0]?.max_position || 0;
};

const shiftPositionsFrom = async (playlistId, fromPosition) => {
  await query(
    'UPDATE playlist_songs SET position = position + 1 WHERE playlist_id = ? AND position >= ?',
    [playlistId, fromPosition]
  );
};

const addSongToPlaylist = async ({ playlistId, songId, position, addedByUserId }) => {
  await query(
    `
      INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
      VALUES (?, ?, ?, ?)
    `,
    [playlistId, songId, position, addedByUserId || null]
  );
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  const item = await findPlaylistSong(playlistId, songId);
  if (!item) {
    return false;
  }

  await query('DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?', [playlistId, songId]);
  await query('UPDATE playlist_songs SET position = position - 1 WHERE playlist_id = ? AND position > ?', [playlistId, item.position]);

  return true;
};

const reorderPlaylistSongs = async (playlistId, orderedSongIds) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (let i = 0; i < orderedSongIds.length; i += 1) {
      await connection.execute(
        'UPDATE playlist_songs SET position = ? WHERE playlist_id = ? AND song_id = ?',
        [i + 1, playlistId, orderedSongIds[i]]
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

const countPlaylistSongs = async (playlistId) => {
  const rows = await query('SELECT COUNT(*) AS total FROM playlist_songs WHERE playlist_id = ?', [playlistId]);
  return rows[0]?.total || 0;
};

module.exports = {
  findPlaylistById,
  listPlaylistsByOwner,
  listPublicPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  isSongActive,
  listPlaylistSongs,
  findPlaylistSong,
  getMaxPlaylistPosition,
  shiftPositionsFrom,
  addSongToPlaylist,
  removeSongFromPlaylist,
  reorderPlaylistSongs,
  countPlaylistSongs
};
