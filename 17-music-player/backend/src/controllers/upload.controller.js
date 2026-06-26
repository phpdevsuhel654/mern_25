'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const uploadService = require('../services/upload.service');

const listUploads = asyncHandler(async (_req, res) => {
  const payload = await uploadService.listUploads();
  return success(res, payload, httpStatus.OK);
});

const createUpload = asyncHandler(async (req, res) => {
  const payload = await uploadService.createUpload(req.body);
  return success(res, { upload: payload }, httpStatus.CREATED);
});

const updateUpload = asyncHandler(async (req, res) => {
  const payload = await uploadService.updateUpload(Number(req.params.id), req.body);
  return success(res, { upload: payload }, httpStatus.OK);
});

const deleteUpload = asyncHandler(async (req, res) => {
  await uploadService.deleteUpload(Number(req.params.id));
  return success(res, { message: 'Upload record deleted successfully' }, httpStatus.OK);
});

module.exports = {
  listUploads,
  createUpload,
  updateUpload,
  deleteUpload
};
