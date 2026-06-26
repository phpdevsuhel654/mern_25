'use strict';

const { query } = require('../config/db');

const findById = async (artistId) => {
  const rows = await query('SELECT * FROM artists WHERE id = ? LIMIT 1', [artistId]);
  return rows[0] || null;
};

const findBySlug = async (slug) => {
  const rows = await query('SELECT id, slug FROM artists WHERE slug = ? LIMIT 1', [slug]);
  return rows[0] || null;
};

const list = async ({ whereClause, values, limit, offset }) => {
  const rows = await query(
    `
      SELECT id, name, slug, bio, image_url, country, is_active, created_at, updated_at
      FROM artists
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  return rows;
};

const count = async ({ whereClause, values }) => {
  const rows = await query(`SELECT COUNT(*) AS total FROM artists ${whereClause}`, values);
  return rows[0]?.total || 0;
};

const create = async ({ name, slug, bio, imageUrl, country, isActive }) => {
  const result = await query(
    `
      INSERT INTO artists (name, slug, bio, image_url, country, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [name, slug, bio, imageUrl, country, isActive]
  );

  return result.insertId;
};

const update = async (artistId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE artists SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, artistId]);
};

const setActiveStatus = async (artistId, isActive) => {
  await query('UPDATE artists SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [isActive, artistId]);
};

module.exports = {
  findById,
  findBySlug,
  list,
  count,
  create,
  update,
  setActiveStatus
};
