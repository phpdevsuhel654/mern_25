'use strict';

const { body } = require('express-validator');

const registerValidation = [
  body('fullName').trim().isLength({ min: 2, max: 120 }).withMessage('fullName must be between 2 and 120 characters'),
  body('username')
    .trim()
    .matches(/^[a-zA-Z0-9_.-]{3,60}$/)
    .withMessage('username must be 3-60 characters and can include letters, numbers, _, ., -'),
  body('email').trim().isEmail().withMessage('email must be valid').normalizeEmail(),
  body('password')
    .isLength({ min: 8, max: 72 })
    .withMessage('password must be between 8 and 72 characters')
    .matches(/[A-Z]/)
    .withMessage('password must include at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('password must include at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('password must include at least one number')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('password must include at least one special character')
];

const loginValidation = [
  body('identifier').trim().isLength({ min: 3, max: 191 }).withMessage('identifier is required'),
  body('password').isLength({ min: 8, max: 72 }).withMessage('password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};
