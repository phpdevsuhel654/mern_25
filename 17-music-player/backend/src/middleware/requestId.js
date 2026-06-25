'use strict';

const crypto = require('crypto');

const requestId = (req, res, next) => {
  const incomingId = req.headers['x-request-id'];
  const id = incomingId && String(incomingId).trim() ? String(incomingId).trim() : crypto.randomUUID();

  req.requestId = id;
  res.setHeader('x-request-id', id);

  next();
};

module.exports = requestId;
