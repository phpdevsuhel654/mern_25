'use strict';

const env = require('../config/env');
const { success } = require('../utils/apiResponse');

const getHealth = (_req, res) => {
  return success(
    res,
    {
      service: 'music-player-backend',
      status: 'ok',
      environment: env.nodeEnv,
      uptimeSeconds: Math.floor(process.uptime())
    },
    200
  );
};

module.exports = {
  getHealth
};
