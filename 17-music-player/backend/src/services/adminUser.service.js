'use strict';

const bcrypt = require('bcryptjs');

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const env = require('../config/env');
const adminUserRepository = require('../repositories/adminUser.repository');

const mapUser = (user) => ({
  id: user.id,
  role: user.role,
  fullName: user.full_name,
  username: user.username,
  email: user.email,
  avatarUrl: user.avatar_url,
  bio: user.bio,
  status: user.status,
  lastLoginAt: user.last_login_at,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
  deletedAt: user.deleted_at
});

const buildWhere = (queryParams) => {
  const clauses = ['1 = 1'];
  const values = [];

  if (queryParams.search) {
    clauses.push('(u.full_name LIKE ? OR u.username LIKE ? OR u.email LIKE ?)');
    const term = `%${String(queryParams.search).trim()}%`;
    values.push(term, term, term);
  }

  if (queryParams.role) {
    clauses.push('r.name = ?');
    values.push(String(queryParams.role));
  }

  if (queryParams.status) {
    clauses.push('u.status = ?');
    values.push(String(queryParams.status));
  }

  if (queryParams.includeDeleted !== 'true') {
    clauses.push('u.deleted_at IS NULL');
  }

  return {
    whereClause: `WHERE ${clauses.join(' AND ')}`,
    values
  };
};

const ensureUniqueIdentity = async ({ email, username, excludedUserId = null }) => {
  const [existingEmail, existingUsername] = await Promise.all([
    email ? adminUserRepository.findByEmail(email, excludedUserId) : null,
    username ? adminUserRepository.findByUsername(username, excludedUserId) : null
  ]);

  if (existingEmail) {
    throw new AppError('Email already in use', httpStatus.CONFLICT);
  }

  if (existingUsername) {
    throw new AppError('Username already in use', httpStatus.CONFLICT);
  }
};

const resolveRoleId = async (role) => {
  const roleRow = await adminUserRepository.getRoleByName(role || 'user');
  if (!roleRow) {
    throw new AppError('Invalid role', httpStatus.BAD_REQUEST);
  }

  return roleRow.id;
};

const listUsers = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { whereClause, values } = buildWhere(queryParams);

  const [items, total] = await Promise.all([
    adminUserRepository.list({ whereClause, values, limit, offset }),
    adminUserRepository.count({ whereClause, values })
  ]);

  return {
    items: items.map(mapUser),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1)
    }
  };
};

const getUserById = async (userId) => {
  const user = await adminUserRepository.findById(userId);
  if (!user) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  return mapUser(user);
};

const createUser = async (payload) => {
  await ensureUniqueIdentity({ email: payload.email, username: payload.username });

  const roleId = await resolveRoleId(payload.role);
  const passwordHash = await bcrypt.hash(payload.password, env.bcryptSaltRounds);

  const userId = await adminUserRepository.create({
    roleId,
    fullName: payload.fullName,
    username: payload.username,
    email: payload.email,
    passwordHash,
    status: payload.status || 'active',
    avatarUrl: payload.avatarUrl || null,
    bio: payload.bio || null
  });

  return getUserById(userId);
};

const updateUser = async (userId, payload) => {
  const existing = await adminUserRepository.findById(userId);
  if (!existing) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  await ensureUniqueIdentity({
    email: payload.email,
    username: payload.username,
    excludedUserId: userId
  });

  const fields = {};

  if (payload.fullName !== undefined) fields.full_name = payload.fullName;
  if (payload.username !== undefined) fields.username = payload.username;
  if (payload.email !== undefined) fields.email = payload.email;
  if (payload.avatarUrl !== undefined) fields.avatar_url = payload.avatarUrl || null;
  if (payload.bio !== undefined) fields.bio = payload.bio || null;
  if (payload.status !== undefined) fields.status = payload.status;

  if (payload.role !== undefined) {
    fields.role_id = await resolveRoleId(payload.role);
  }

  if (payload.password) {
    fields.password_hash = await bcrypt.hash(payload.password, env.bcryptSaltRounds);
  }

  await adminUserRepository.update(userId, fields);
  return getUserById(userId);
};

const deleteUser = async (userId, actor) => {
  if (Number(actor.userId) === Number(userId)) {
    throw new AppError('Admin cannot delete own account', httpStatus.BAD_REQUEST);
  }

  const existing = await adminUserRepository.findById(userId);
  if (!existing) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  await adminUserRepository.softDelete(userId);
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
