'use strict';

const { query } = require('../config/db');

const getRoleByName = async (name) => {
  const rows = await query('SELECT id, name FROM roles WHERE name = ? LIMIT 1', [name]);
  return rows[0] || null;
};

const findUserByEmailOrUsername = async (identifier) => {
  const rows = await query(
    `
      SELECT
        u.id,
        u.role_id,
        r.name AS role,
        u.full_name,
        u.username,
        u.email,
        u.password_hash,
        u.avatar_url,
        u.bio,
        u.status,
        u.last_login_at,
        u.created_at,
        u.updated_at
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      WHERE (u.email = ? OR u.username = ?) AND u.deleted_at IS NULL
      LIMIT 1
    `,
    [identifier, identifier]
  );

  return rows[0] || null;
};

const findUserByEmail = async (email) => {
  const rows = await query('SELECT id FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1', [email]);
  return rows[0] || null;
};

const findUserByUsername = async (username) => {
  const rows = await query('SELECT id FROM users WHERE username = ? AND deleted_at IS NULL LIMIT 1', [username]);
  return rows[0] || null;
};

const createUser = async ({ roleId, fullName, username, email, passwordHash }) => {
  const result = await query(
    `
      INSERT INTO users (role_id, full_name, username, email, password_hash)
      VALUES (?, ?, ?, ?, ?)
    `,
    [roleId, fullName, username, email, passwordHash]
  );

  return result.insertId;
};

const findUserProfileById = async (userId) => {
  const rows = await query(
    `
      SELECT
        u.id,
        r.name AS role,
        u.full_name,
        u.username,
        u.email,
        u.avatar_url,
        u.bio,
        u.status,
        u.last_login_at,
        u.created_at,
        u.updated_at
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      WHERE u.id = ? AND u.deleted_at IS NULL
      LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

const updateLastLogin = async (userId) => {
  await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [userId]);
};

module.exports = {
  getRoleByName,
  findUserByEmailOrUsername,
  findUserByEmail,
  findUserByUsername,
  createUser,
  findUserProfileById,
  updateLastLogin
};
