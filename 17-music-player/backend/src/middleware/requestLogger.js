'use strict';

const morgan = require('morgan');
const logger = require('../config/logger');

const stream = {
  write: (message) => {
    logger.info('HTTP request', { event: message.trim() });
  }
};

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms req_id=:req[x-request-id]', {
  stream
});

module.exports = requestLogger;
