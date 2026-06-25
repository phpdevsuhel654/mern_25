'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const songService = require('../services/song.service');

const listSongs = asyncHandler(async (req, res) => {
  const payload = await songService.listSongs(req.query);
  return success(res, payload, httpStatus.OK);
});

const getSongById = asyncHandler(async (req, res) => {
  const payload = await songService.getSongById(Number(req.params.id));
  return success(res, { song: payload }, httpStatus.OK);
});

const createSong = asyncHandler(async (req, res) => {
  const payload = await songService.createSong(req.body, req.user);
  return success(res, { song: payload }, httpStatus.CREATED);
});

const updateSong = asyncHandler(async (req, res) => {
  const payload = await songService.updateSong(Number(req.params.id), req.body);
  return success(res, { song: payload }, httpStatus.OK);
});

const updateSongStatus = asyncHandler(async (req, res) => {
  const payload = await songService.updateSongStatus(Number(req.params.id), req.body.isActive);
  return success(res, { song: payload }, httpStatus.OK);
});

const deleteSong = asyncHandler(async (req, res) => {
  await songService.deleteSong(Number(req.params.id));
  return success(res, { message: 'Song archived successfully' }, httpStatus.OK);
});

module.exports = {
  listSongs,
  getSongById,
  createSong,
  updateSong,
  updateSongStatus,
  deleteSong
};
