'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')];

const listUsersValidation = [
  query('search').optional().isString().isLength({ max: 191 }).withMessage('search must be up to 191 chars'),
  query('role').optional().isIn(['admin', 'user']).withMessage('role must be admin or user'),
  query('status').optional().isIn(['active', 'suspended', 'deleted']).withMessage('invalid status'),
  query('includeDeleted').optional().isIn(['true', 'false']).withMessage('includeDeleted must be true or false'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

const createUserValidation = [
  body('fullName').trim().isLength({ min: 1, max: 120 }).withMessage('fullName is required and max 120 chars'),
  body('username').trim().isLength({ min: 3, max: 60 }).withMessage('username must be 3-60 chars'),
  body('email').isEmail().withMessage('email must be valid'),
  body('password').isLength({ min: 8, max: 64 }).withMessage('password must be 8-64 chars'),
  body('role').optional().isIn(['admin', 'user']).withMessage('role must be admin or user'),
  body('status').optional().isIn(['active', 'suspended', 'deleted']).withMessage('invalid status'),
  body('avatarUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('avatarUrl must be a valid URL'),
  body('bio').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('bio max length is 500')
];

const updateUserValidation = [
  ...idParamValidation,
  body('fullName').optional().trim().isLength({ min: 1, max: 120 }).withMessage('fullName max length is 120'),
  body('username').optional().trim().isLength({ min: 3, max: 60 }).withMessage('username must be 3-60 chars'),
  body('email').optional().isEmail().withMessage('email must be valid'),
  body('password').optional().isLength({ min: 8, max: 64 }).withMessage('password must be 8-64 chars'),
  body('role').optional().isIn(['admin', 'user']).withMessage('role must be admin or user'),
  body('status').optional().isIn(['active', 'suspended', 'deleted']).withMessage('invalid status'),
  body('avatarUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('avatarUrl must be a valid URL'),
  body('bio').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('bio max length is 500')
];

module.exports = {
  idParamValidation,
  listUsersValidation,
  createUserValidation,
  updateUserValidation
};
