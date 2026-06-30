'use strict';

const express = require('express');
const fileUploadController = require('../controllers/fileUpload.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { handleFileUpload } = require('../middleware/fileUpload');
const ROLES = require('../constants/roles');

const router = express.Router();

// File upload endpoint - requires authentication and admin role
router.post('/', authenticate, authorize(ROLES.ADMIN), handleFileUpload, fileUploadController.uploadFile);

module.exports = router;
