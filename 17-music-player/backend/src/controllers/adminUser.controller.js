'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const adminUserService = require('../services/adminUser.service');

const listUsers = asyncHandler(async (req, res) => {
  const payload = await adminUserService.listUsers(req.query);
  return success(res, payload, httpStatus.OK);
});

const getUserById = asyncHandler(async (req, res) => {
  const payload = await adminUserService.getUserById(Number(req.params.id));
  return success(res, { user: payload }, httpStatus.OK);
});

const createUser = asyncHandler(async (req, res) => {
  const payload = await adminUserService.createUser(req.body);
  return success(res, { user: payload }, httpStatus.CREATED);
});

const updateUser = asyncHandler(async (req, res) => {
  const payload = await adminUserService.updateUser(Number(req.params.id), req.body);
  return success(res, { user: payload }, httpStatus.OK);
});

const deleteUser = asyncHandler(async (req, res) => {
  await adminUserService.deleteUser(Number(req.params.id), req.user);
  return success(res, { message: 'User deleted successfully' }, httpStatus.OK);
});

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
