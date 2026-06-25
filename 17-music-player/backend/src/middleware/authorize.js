'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');

const authorize = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', httpStatus.UNAUTHORIZED));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden: insufficient role permissions', httpStatus.FORBIDDEN));
    }

    next();
  };
};

module.exports = authorize;
