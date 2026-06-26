'use strict';

const { query } = require('../config/db');

const BASE_SELECT = `
  SELECT
    u.id,
    u.role_id,
    r.name AS role,
    u.full_name,
    u.username,
    u.email,
    u.avatar_url,
    u.bio,
    u.status,
    u.last_login_at,
    u.created_at,
    u.updated_at,
    u.deleted_at
  FROM users u
  INNER JOIN roles r ON r.id = u.role_id
`;

const findById = async (userId) => {
  const rows = await query(`${BASE_SELECT} WHERE u.id = ? LIMIT 1`, [userId]);
  return rows[0] || null;
};

const findByEmail = async (email, excludedUserId = null) => {
  const params = [email];
  let whereClause = 'WHERE u.email = ?';

  if (excludedUserId) {
    whereClause += ' AND u.id <> ?';
    params.push(excludedUserId);
  }

  const rows = await query(`SELECT u.id FROM users u ${whereClause} LIMIT 1`, params);
  return rows[0] || null;
};

const findByUsername = async (username, excludedUserId = null) => {
  const params = [username];
  let whereClause = 'WHERE u.username = ?';

  if (excludedUserId) {
    whereClause += ' AND u.id <> ?';
    params.push(excludedUserId);
  }

  const rows = await query(`SELECT u.id FROM users u ${whereClause} LIMIT 1`, params);
  return rows[0] || null;
};

const getRoleByName = async (roleName) => {
  const rows = await query('SELECT id, name FROM roles WHERE name = ? LIMIT 1', [roleName]);
  return rows[0] || null;
};

const list = async ({ whereClause, values, limit, offset }) => {
  const rows = await query(
    `
      ${BASE_SELECT}
      ${whereClause}
      ORDER BY u.created_at DESC
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
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      ${whereClause}
    `,
    values
  );

  return rows[0]?.total || 0;
};

const create = async ({ roleId, fullName, username, email, passwordHash, status, avatarUrl, bio }) => {
  const result = await query(
    `
      INSERT INTO users (role_id, full_name, username, email, password_hash, status, avatar_url, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [roleId, fullName, username, email, passwordHash, status, avatarUrl, bio]
  );

  return result.insertId;
};

const update = async (userId, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);

  await query(`UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, userId]);
};

const softDelete = async (userId) => {
  await query(
    "UPDATE users SET status = 'deleted', deleted_at = NOW(), updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [userId]
  );
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  getRoleByName,
  list,
  count,
  create,
  update,
  softDelete
};
