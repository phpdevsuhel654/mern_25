'use strict';

const express = require('express');

const adminUserController = require('../controllers/adminUser.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const ROLES = require('../constants/roles');
const {
  idParamValidation,
  listUsersValidation,
  createUserValidation,
  updateUserValidation
} = require('../validations/adminUser.validation');

const router = express.Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', listUsersValidation, validateRequest, adminUserController.listUsers);
router.get('/:id', idParamValidation, validateRequest, adminUserController.getUserById);
router.post('/', createUserValidation, validateRequest, adminUserController.createUser);
router.patch('/:id', updateUserValidation, validateRequest, adminUserController.updateUser);
router.delete('/:id', idParamValidation, validateRequest, adminUserController.deleteUser);

module.exports = router;
