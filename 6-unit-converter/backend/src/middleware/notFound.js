const AppError = require('../utils/AppError');

const notFound = (_req, _res, next) => {
  next(new AppError('Route not found', 404));
};

module.exports = notFound;
