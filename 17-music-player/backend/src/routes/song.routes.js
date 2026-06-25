'use strict';

const express = require('express');

const songController = require('../controllers/song.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  listSongsValidation,
  createSongValidation,
  updateSongValidation,
  updateSongStatusValidation
} = require('../validations/song.validation');

const router = express.Router();

router.get('/', listSongsValidation, validateRequest, songController.listSongs);
router.get('/:id', idParamValidation, validateRequest, songController.getSongById);

router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  createSongValidation,
  validateRequest,
  songController.createSong
);

router.patch(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  updateSongValidation,
  validateRequest,
  songController.updateSong
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(ROLES.ADMIN),
  updateSongStatusValidation,
  validateRequest,
  songController.updateSongStatus
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  idParamValidation,
  validateRequest,
  songController.deleteSong
);

module.exports = router;
