'use strict';

const express = require('express');

const artistController = require('../controllers/artist.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  listArtistsValidation,
  createArtistValidation,
  updateArtistValidation
} = require('../validations/artist.validation');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', listArtistsValidation, validateRequest, artistController.listArtists);
router.get('/:id', idParamValidation, validateRequest, artistController.getArtistById);
router.post('/', createArtistValidation, validateRequest, artistController.createArtist);
router.patch('/:id', updateArtistValidation, validateRequest, artistController.updateArtist);
router.delete('/:id', idParamValidation, validateRequest, artistController.deleteArtist);

module.exports = router;
