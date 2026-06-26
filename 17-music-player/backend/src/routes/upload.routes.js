'use strict';

const express = require('express');

const uploadController = require('../controllers/upload.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  createUploadValidation,
  updateUploadValidation
} = require('../validations/upload.validation');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', uploadController.listUploads);
router.post('/', createUploadValidation, validateRequest, uploadController.createUpload);
router.patch('/:id', updateUploadValidation, validateRequest, uploadController.updateUpload);
router.delete('/:id', idParamValidation, validateRequest, uploadController.deleteUpload);

module.exports = router;
