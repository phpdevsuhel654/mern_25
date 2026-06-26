'use strict';

const express = require('express');

const genreController = require('../controllers/genre.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  listGenresValidation,
  createGenreValidation,
  updateGenreValidation
} = require('../validations/genre.validation');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', listGenresValidation, validateRequest, genreController.listGenres);
router.get('/:id', idParamValidation, validateRequest, genreController.getGenreById);
router.post('/', createGenreValidation, validateRequest, genreController.createGenre);
router.patch('/:id', updateGenreValidation, validateRequest, genreController.updateGenre);
router.delete('/:id', idParamValidation, validateRequest, genreController.deleteGenre);

module.exports = router;
