'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const artistService = require('../services/artist.service');

const listArtists = asyncHandler(async (req, res) => {
  const payload = await artistService.listArtists(req.query);
  return success(res, payload, httpStatus.OK);
});

const getArtistById = asyncHandler(async (req, res) => {
  const payload = await artistService.getArtistById(Number(req.params.id));
  return success(res, { artist: payload }, httpStatus.OK);
});

const createArtist = asyncHandler(async (req, res) => {
  const payload = await artistService.createArtist(req.body);
  return success(res, { artist: payload }, httpStatus.CREATED);
});

const updateArtist = asyncHandler(async (req, res) => {
  const payload = await artistService.updateArtist(Number(req.params.id), req.body);
  return success(res, { artist: payload }, httpStatus.OK);
});

const deleteArtist = asyncHandler(async (req, res) => {
  await artistService.deleteArtist(Number(req.params.id));
  return success(res, { message: 'Artist archived successfully' }, httpStatus.OK);
});

module.exports = {
  listArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
};
