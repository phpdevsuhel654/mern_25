'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')];

const listArtistsValidation = [
  query('search').optional().isString().isLength({ max: 150 }).withMessage('search must be up to 150 chars'),
  query('isActive').optional().isIn(['true', 'false', '1', '0']).withMessage('isActive must be boolean-like'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

const createArtistValidation = [
  body('name').trim().isLength({ min: 1, max: 150 }).withMessage('name is required and max 150 chars'),
  body('bio').optional({ nullable: true }).isString().isLength({ max: 4000 }).withMessage('bio max length is 4000'),
  body('imageUrl').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('imageUrl max length is 500'),
  body('country').optional({ nullable: true }).isString().isLength({ max: 80 }).withMessage('country max length is 80'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

const updateArtistValidation = [
  ...idParamValidation,
  body('name').optional().trim().isLength({ min: 1, max: 150 }).withMessage('name max length is 150'),
  body('bio').optional({ nullable: true }).isString().isLength({ max: 4000 }).withMessage('bio max length is 4000'),
  body('imageUrl').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('imageUrl max length is 500'),
  body('country').optional({ nullable: true }).isString().isLength({ max: 80 }).withMessage('country max length is 80'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

module.exports = {
  idParamValidation,
  listArtistsValidation,
  createArtistValidation,
  updateArtistValidation
};
