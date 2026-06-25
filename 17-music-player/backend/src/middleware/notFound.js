'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');

const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, httpStatus.NOT_FOUND));
};

module.exports = notFound;
