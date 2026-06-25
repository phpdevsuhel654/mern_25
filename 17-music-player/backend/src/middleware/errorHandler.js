'use strict';

const env = require('../config/env');
const logger = require('../config/logger');
const httpStatus = require('../constants/httpStatus');

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  logger.error('Request failed', {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: env.isProduction ? undefined : err.stack
  });

  const payload = {
    success: false,
    message,
    requestId: req.requestId
  };

  if (!env.isProduction) {
    payload.details = err.details || null;
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};

module.exports = errorHandler;
