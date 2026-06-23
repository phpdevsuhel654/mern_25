const { formatErrorResponse } = require('../utils/responseFormatter');
const env = require('../config/env');

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  const payload = formatErrorResponse(message);

  if (env.nodeEnv !== 'production') {
    payload.path = req.originalUrl;
    payload.timestamp = new Date().toISOString();
  }

  res.status(statusCode).json(payload);
};

module.exports = errorHandler;
