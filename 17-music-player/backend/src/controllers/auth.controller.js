'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const authService = require('../services/auth.service');

const register = asyncHandler(async (req, res) => {
  const payload = await authService.register(req.body);
  return success(res, payload, httpStatus.CREATED);
});

const login = asyncHandler(async (req, res) => {
  const payload = await authService.login(req.body);
  return success(res, payload, httpStatus.OK);
});

const me = asyncHandler(async (req, res) => {
  const profile = await authService.getProfile(req.user.userId);
  return success(res, { user: profile }, httpStatus.OK);
});

const logout = asyncHandler(async (_req, res) => {
  return success(
    res,
    {
      message: 'Logged out successfully. Please discard token on client side.'
    },
    httpStatus.OK
  );
});

module.exports = {
  register,
  login,
  me,
  logout
};
