'use strict';

const { query } = require('../config/db');

const findById = async (genreId) => {
  const rows = await query('SELECT * FROM genres WHERE id = ? LIMIT 1', [genreId]);
  return rows[0] || null;
};

const findBySlug = async (slug) => {
  const rows = await query('SELECT id, slug FROM genres WHERE slug = ? LIMIT 1', [slug]);
  return rows[0] || null;
};

const list = async ({ whereClause, values, limit, offset }) => {
  const rows = await query(
    `
      SELECT id, name, slug, description, is_active, created_at, updated_at
      FROM genres
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  return rows;
};

const count = async ({ whereClause, values }) => {
  const rows = await query(`SELECT COUNT(*) AS total FROM genres ${whereClause}`, values);
  return rows[0]?.total || 0;
};

const create = async ({ name, slug, description, isActive }) => {
  const result = await query(
    `
      INSERT INTO genres (name, slug, description, is_active)
      VALUES (?, ?, ?, ?)
    `,
    [name, slug, description, isActive]
  );

  return result.insertId;
};

const update = async (genreId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE genres SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, genreId]);
};

const setActiveStatus = async (genreId, isActive) => {
  await query('UPDATE genres SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [isActive, genreId]);
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
