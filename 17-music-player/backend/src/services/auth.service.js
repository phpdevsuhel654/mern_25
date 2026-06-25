'use strict';

const bcrypt = require('bcryptjs');

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const ROLES = require('../constants/roles');
const sanitizeUser = require('../utils/sanitizeUser');
const { signAccessToken } = require('../helpers/jwt');
const env = require('../config/env');
const authRepository = require('../repositories/auth.repository');

const register = async ({ fullName, username, email, password }) => {
  const [existingEmail, existingUsername] = await Promise.all([
    authRepository.findUserByEmail(email),
    authRepository.findUserByUsername(username)
  ]);

  if (existingEmail) {
    throw new AppError('Email already registered', httpStatus.CONFLICT);
  }

  if (existingUsername) {
    throw new AppError('Username already taken', httpStatus.CONFLICT);
  }

  const defaultRole = await authRepository.getRoleByName(ROLES.USER);
  if (!defaultRole) {
    throw new AppError('Default user role not configured', httpStatus.INTERNAL_SERVER_ERROR);
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);

  const userId = await authRepository.createUser({
    roleId: defaultRole.id,
    fullName,
    username,
    email,
    passwordHash
  });

  const createdUser = await authRepository.findUserProfileById(userId);

  const token = signAccessToken({
    sub: createdUser.id,
    role: createdUser.role,
    email: createdUser.email
  });

  return {
    token,
    user: sanitizeUser(createdUser)
  };
};

const login = async ({ identifier, password }) => {
  const user = await authRepository.findUserByEmailOrUsername(identifier);

  if (!user) {
    throw new AppError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  if (user.status !== 'active') {
    throw new AppError('Account is not active', httpStatus.FORBIDDEN);
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new AppError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  await authRepository.updateLastLogin(user.id);

  const token = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email
  });

  return {
    token,
    user: sanitizeUser(user)
  };
};

const getProfile = async (userId) => {
  const user = await authRepository.findUserProfileById(userId);

  if (!user) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  return sanitizeUser(user);
};

module.exports = {
  register,
  login,
  getProfile
};
