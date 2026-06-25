'use strict';

const express = require('express');

const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const ROLES = require('../constants/roles');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);
router.get('/admin/check', authenticate, authorize(ROLES.ADMIN), (_req, res) => {
  res.status(200).json({ success: true, data: { allowed: true } });
});

module.exports = router;
