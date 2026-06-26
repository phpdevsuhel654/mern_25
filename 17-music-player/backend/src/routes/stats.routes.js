'use strict';

const express = require('express');

const statsController = require('../controllers/stats.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const ROLES = require('../constants/roles');

const router = express.Router();

router.get('/overview', authenticate, authorize(ROLES.ADMIN), statsController.getOverview);

module.exports = router;
