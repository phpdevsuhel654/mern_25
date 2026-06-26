'use strict';

const express = require('express');

const albumController = require('../controllers/album.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  listAlbumsValidation,
  createAlbumValidation,
  updateAlbumValidation
} = require('../validations/album.validation');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', listAlbumsValidation, validateRequest, albumController.listAlbums);
router.get('/:id', idParamValidation, validateRequest, albumController.getAlbumById);
router.post('/', createAlbumValidation, validateRequest, albumController.createAlbum);
router.patch('/:id', updateAlbumValidation, validateRequest, albumController.updateAlbum);
router.delete('/:id', idParamValidation, validateRequest, albumController.deleteAlbum);

module.exports = router;
