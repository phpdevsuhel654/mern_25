'use strict';

const { query } = require('../config/db');

const BASE_SONG_SELECT = `
  SELECT
    s.id,
    s.artist_id,
    s.album_id,
    s.genre_id,
    s.created_by_user_id,
    s.title,
    s.slug,
    s.duration_seconds,
    s.source_type,
    s.file_path,
    s.external_url,
    s.cover_image_url,
    s.track_number,
    s.disc_number,
    s.playback_bitrate_kbps,
    s.is_explicit,
    s.release_date,
    s.is_active,
    s.created_at,
    s.updated_at,
    ar.name AS artist_name,
    al.title AS album_title,
    g.name AS genre_name,
    u.username AS created_by_username
  FROM songs s
  INNER JOIN artists ar ON ar.id = s.artist_id
  LEFT JOIN albums al ON al.id = s.album_id
  INNER JOIN genres g ON g.id = s.genre_id
  LEFT JOIN users u ON u.id = s.created_by_user_id
`;

const SORT_COLUMN_MAP = {
  createdAt: 's.created_at',
  title: 's.title',
  releaseDate: 's.release_date',
  durationSeconds: 's.duration_seconds'
};

const findById = async (songId) => {
  const rows = await query(
    `${BASE_SONG_SELECT} WHERE s.id = ? LIMIT 1`,
    [songId]
  );

  return rows[0] || null;
};

const findBySlug = async (slug) => {
  const rows = await query('SELECT id, slug FROM songs WHERE slug = ? LIMIT 1', [slug]);
  return rows[0] || null;
};

const create = async (payload) => {
  const result = await query(
    `
      INSERT INTO songs (
        artist_id,
        album_id,
        genre_id,
        created_by_user_id,
        title,
        slug,
        duration_seconds,
        source_type,
        file_path,
        external_url,
        cover_image_url,
        track_number,
        disc_number,
        playback_bitrate_kbps,
        is_explicit,
        release_date,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      payload.artistId,
      payload.albumId,
      payload.genreId,
      payload.createdByUserId,
      payload.title,
      payload.slug,
      payload.durationSeconds,
      payload.sourceType,
      payload.filePath,
      payload.externalUrl,
      payload.coverImageUrl,
      payload.trackNumber,
      payload.discNumber,
      payload.playbackBitrateKbps,
      payload.isExplicit,
      payload.releaseDate,
      payload.isActive
    ]
  );

  return result.insertId;
};

const update = async (songId, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE songs SET ${setClause} WHERE id = ?`, [...values, songId]);
};

const setActiveStatus = async (songId, isActive) => {
  await query('UPDATE songs SET is_active = ? WHERE id = ?', [isActive, songId]);
};

const list = async ({ whereClause, values, sortBy, sortOrder, limit, offset }) => {
  const column = SORT_COLUMN_MAP[sortBy] || SORT_COLUMN_MAP.createdAt;
  const order = sortOrder === 'ASC' ? 'ASC' : 'DESC';

  const rows = await query(
    `
      ${BASE_SONG_SELECT}
      ${whereClause}
      ORDER BY ${column} ${order}
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  return rows;
};

const count = async ({ whereClause, values }) => {
  const rows = await query(
    `
      SELECT COUNT(*) AS total
      FROM songs s
      INNER JOIN artists ar ON ar.id = s.artist_id
      LEFT JOIN albums al ON al.id = s.album_id
      INNER JOIN genres g ON g.id = s.genre_id
      ${whereClause}
    `,
    values
  );

  return rows[0]?.total || 0;
};

const existsArtist = async (artistId) => {
  const rows = await query('SELECT id FROM artists WHERE id = ? LIMIT 1', [artistId]);
  return Boolean(rows[0]);
};

const existsAlbum = async (albumId) => {
  if (!albumId) {
    return true;
  }

  const rows = await query('SELECT id FROM albums WHERE id = ? LIMIT 1', [albumId]);
  return Boolean(rows[0]);
};

const existsGenre = async (genreId) => {
  const rows = await query('SELECT id FROM genres WHERE id = ? LIMIT 1', [genreId]);
  return Boolean(rows[0]);
};

module.exports = {
  findById,
  findBySlug,
  create,
  update,
  setActiveStatus,
  list,
  count,
  existsArtist,
  existsAlbum,
  existsGenre
};
