'use strict';

const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { testConnection } = require('./config/db');

const start = async () => {
  await testConnection();

  const server = app.listen(env.port, () => {
    logger.info('Server started', {
      port: env.port,
      nodeEnv: env.nodeEnv
    });
  });

  const shutdown = (signal) => {
    logger.warn('Shutdown signal received', { signal });
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start().catch((error) => {
  logger.error('Server failed to start', { message: error.message });
  process.exit(1);
});
