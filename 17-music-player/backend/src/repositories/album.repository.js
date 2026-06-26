'use strict';

const { query } = require('../config/db');

const BASE_SELECT = `
  SELECT
    al.id,
    al.artist_id,
    ar.name AS artist_name,
    al.title,
    al.slug,
    al.cover_image_url,
    al.release_date,
    al.label_name,
    al.total_tracks,
    al.is_active,
    al.created_at,
    al.updated_at
  FROM albums al
  INNER JOIN artists ar ON ar.id = al.artist_id
`;

const findById = async (albumId) => {
  const rows = await query(`${BASE_SELECT} WHERE al.id = ? LIMIT 1`, [albumId]);
  return rows[0] || null;
};

const findBySlug = async (slug) => {
  const rows = await query('SELECT id, slug FROM albums WHERE slug = ? LIMIT 1', [slug]);
  return rows[0] || null;
};

const list = async ({ whereClause, values, limit, offset }) => {
  const rows = await query(
    `
      ${BASE_SELECT}
      ${whereClause}
      ORDER BY al.created_at DESC
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
      FROM albums al
      INNER JOIN artists ar ON ar.id = al.artist_id
      ${whereClause}
    `,
    values
  );

  return rows[0]?.total || 0;
};

const create = async ({ artistId, title, slug, coverImageUrl, releaseDate, labelName, totalTracks, isActive }) => {
  const result = await query(
    `
      INSERT INTO albums (artist_id, title, slug, cover_image_url, release_date, label_name, total_tracks, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [artistId, title, slug, coverImageUrl, releaseDate, labelName, totalTracks, isActive]
  );

  return result.insertId;
};

const update = async (albumId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE albums SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, albumId]);
};

const setActiveStatus = async (albumId, isActive) => {
  await query('UPDATE albums SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [isActive, albumId]);
};

const existsArtist = async (artistId) => {
  const rows = await query('SELECT id FROM artists WHERE id = ? LIMIT 1', [artistId]);
  return Boolean(rows[0]);
};

module.exports = {
  findById,
  findBySlug,
  list,
  count,
  create,
  update,
  setActiveStatus,
  existsArtist
};
