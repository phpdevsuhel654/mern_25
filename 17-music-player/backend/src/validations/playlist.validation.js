'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')
];

const listValidation = [
  query('search').optional().isString().isLength({ max: 160 }).withMessage('search max length is 160'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

const createValidation = [
  body('name').trim().isLength({ min: 1, max: 160 }).withMessage('name is required and max length is 160'),
  body('description').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('description max length is 500'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be boolean')
];

const updateValidation = [
  ...idParamValidation,
  body('name').optional().trim().isLength({ min: 1, max: 160 }).withMessage('name max length is 160'),
  body('description').optional({ nullable: true }).isString().isLength({ max: 500 }).withMessage('description max length is 500'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be boolean')
];

const addSongValidation = [
  ...idParamValidation,
  body('songId').isInt({ min: 1 }).withMessage('songId is required and must be a positive integer'),
  body('position').optional().isInt({ min: 1 }).withMessage('position must be >= 1')
];

const removeSongValidation = [
  ...idParamValidation,
  param('songId').isInt({ min: 1 }).withMessage('songId must be a positive integer')
];

const reorderSongsValidation = [
  ...idParamValidation,
  body('orderedSongIds').isArray({ min: 1 }).withMessage('orderedSongIds must be a non-empty array'),
  body('orderedSongIds.*').isInt({ min: 1 }).withMessage('each orderedSongIds entry must be a positive integer')
];

module.exports = {
  idParamValidation,
  listValidation,
  createValidation,
  updateValidation,
  addSongValidation,
  removeSongValidation,
  reorderSongsValidation
};
