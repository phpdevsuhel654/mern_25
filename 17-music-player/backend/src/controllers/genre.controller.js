'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const genreService = require('../services/genre.service');

const listGenres = asyncHandler(async (req, res) => {
  const payload = await genreService.listGenres(req.query);
  return success(res, payload, httpStatus.OK);
});

const getGenreById = asyncHandler(async (req, res) => {
  const payload = await genreService.getGenreById(Number(req.params.id));
  return success(res, { genre: payload }, httpStatus.OK);
});

const createGenre = asyncHandler(async (req, res) => {
  const payload = await genreService.createGenre(req.body);
  return success(res, { genre: payload }, httpStatus.CREATED);
});

const updateGenre = asyncHandler(async (req, res) => {
  const payload = await genreService.updateGenre(Number(req.params.id), req.body);
  return success(res, { genre: payload }, httpStatus.OK);
});

const deleteGenre = asyncHandler(async (req, res) => {
  await genreService.deleteGenre(Number(req.params.id));
  return success(res, { message: 'Genre archived successfully' }, httpStatus.OK);
});

module.exports = {
  listGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};
