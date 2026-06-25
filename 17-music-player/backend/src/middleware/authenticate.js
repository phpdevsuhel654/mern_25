'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const { verifyAccessToken } = require('../helpers/jwt');

const authenticate = (req, _res, next) => {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: token missing', httpStatus.UNAUTHORIZED));
  }

  const token = header.slice(7).trim();

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      userId: decoded.sub,
      role: decoded.role,
      email: decoded.email
    };
    return next();
  } catch (_error) {
    return next(new AppError('Unauthorized: invalid token', httpStatus.UNAUTHORIZED));
  }
};

module.exports = authenticate;
