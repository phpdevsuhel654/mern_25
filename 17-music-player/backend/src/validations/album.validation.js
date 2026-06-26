'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')];

const listAlbumsValidation = [
  query('search').optional().isString().isLength({ max: 180 }).withMessage('search must be up to 180 chars'),
  query('artistId').optional().isInt({ min: 1 }).withMessage('artistId must be a positive integer'),
  query('isActive').optional().isIn(['true', 'false', '1', '0']).withMessage('isActive must be boolean-like'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

const createAlbumValidation = [
  body('artistId').isInt({ min: 1 }).withMessage('artistId is required'),
  body('title').trim().isLength({ min: 1, max: 180 }).withMessage('title is required and max 180 chars'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('releaseDate').optional({ nullable: true }).isISO8601().withMessage('releaseDate must be a valid date'),
  body('labelName').optional({ nullable: true }).isString().isLength({ max: 150 }).withMessage('labelName max length is 150'),
  body('totalTracks').optional().isInt({ min: 0 }).withMessage('totalTracks must be >= 0'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

const updateAlbumValidation = [
  ...idParamValidation,
  body('artistId').optional().isInt({ min: 1 }).withMessage('artistId must be a positive integer'),
  body('title').optional().trim().isLength({ min: 1, max: 180 }).withMessage('title max length is 180'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('releaseDate').optional({ nullable: true }).isISO8601().withMessage('releaseDate must be a valid date'),
  body('labelName').optional({ nullable: true }).isString().isLength({ max: 150 }).withMessage('labelName max length is 150'),
  body('totalTracks').optional().isInt({ min: 0 }).withMessage('totalTracks must be >= 0'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

module.exports = {
  idParamValidation,
  listAlbumsValidation,
  createAlbumValidation,
  updateAlbumValidation
};
