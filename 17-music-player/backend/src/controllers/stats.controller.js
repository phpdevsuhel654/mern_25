'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const statsService = require('../services/stats.service');

const getOverview = asyncHandler(async (_req, res) => {
  const payload = await statsService.getOverview();
  return success(res, payload, httpStatus.OK);
});

module.exports = {
  getOverview
};
