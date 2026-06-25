'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signAccessToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
    issuer: 'music-player-api',
    audience: 'music-player-client'
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtSecret, {
    issuer: 'music-player-api',
    audience: 'music-player-client'
  });
};

module.exports = {
  signAccessToken,
  verifyAccessToken
};
