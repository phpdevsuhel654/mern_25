'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const albumService = require('../services/album.service');

const listAlbums = asyncHandler(async (req, res) => {
  const payload = await albumService.listAlbums(req.query);
  return success(res, payload, httpStatus.OK);
});

const getAlbumById = asyncHandler(async (req, res) => {
  const payload = await albumService.getAlbumById(Number(req.params.id));
  return success(res, { album: payload }, httpStatus.OK);
});

const createAlbum = asyncHandler(async (req, res) => {
  const payload = await albumService.createAlbum(req.body);
  return success(res, { album: payload }, httpStatus.CREATED);
});

const updateAlbum = asyncHandler(async (req, res) => {
  const payload = await albumService.updateAlbum(Number(req.params.id), req.body);
  return success(res, { album: payload }, httpStatus.OK);
});

const deleteAlbum = asyncHandler(async (req, res) => {
  await albumService.deleteAlbum(Number(req.params.id));
  return success(res, { message: 'Album archived successfully' }, httpStatus.OK);
});

module.exports = {
  listAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
};
