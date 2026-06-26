'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')];

const listGenresValidation = [
  query('search').optional().isString().isLength({ max: 100 }).withMessage('search must be up to 100 chars'),
  query('isActive').optional().isIn(['true', 'false', '1', '0']).withMessage('isActive must be boolean-like'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

const createGenreValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('name is required and max 100 chars'),
  body('description').optional({ nullable: true }).isString().isLength({ max: 255 }).withMessage('description max length is 255'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

const updateGenreValidation = [
  ...idParamValidation,
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('name max length is 100'),
  body('description').optional({ nullable: true }).isString().isLength({ max: 255 }).withMessage('description max length is 255'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

module.exports = {
  idParamValidation,
  listGenresValidation,
  createGenreValidation,
  updateGenreValidation
};
