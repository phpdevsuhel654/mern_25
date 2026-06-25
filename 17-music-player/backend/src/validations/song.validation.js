'use strict';

const { body, param, query } = require('express-validator');

const idParamValidation = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')
];

const listSongsValidation = [
  query('search').optional().isString().isLength({ max: 220 }).withMessage('search must be up to 220 characters'),
  query('artistId').optional().isInt({ min: 1 }).withMessage('artistId must be a positive integer'),
  query('albumId').optional().isInt({ min: 1 }).withMessage('albumId must be a positive integer'),
  query('genreId').optional().isInt({ min: 1 }).withMessage('genreId must be a positive integer'),
  query('sourceType').optional().isIn(['local', 'external']).withMessage('sourceType must be local or external'),
  query('isActive').optional().isIn(['true', 'false', '1', '0']).withMessage('isActive must be boolean-like'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('sortBy').optional().isIn(['createdAt', 'title', 'releaseDate', 'durationSeconds']).withMessage('invalid sortBy'),
  query('sortOrder').optional().isIn(['asc', 'desc', 'ASC', 'DESC']).withMessage('sortOrder must be asc or desc')
];

const createSongValidation = [
  body('artistId').isInt({ min: 1 }).withMessage('artistId is required'),
  body('albumId').optional({ nullable: true }).isInt({ min: 1 }).withMessage('albumId must be a positive integer'),
  body('genreId').isInt({ min: 1 }).withMessage('genreId is required'),
  body('title').trim().isLength({ min: 1, max: 220 }).withMessage('title is required and max 220 chars'),
  body('durationSeconds').isInt({ min: 1 }).withMessage('durationSeconds must be greater than 0'),
  body('sourceType').isIn(['local', 'external']).withMessage('sourceType must be local or external'),
  body('filePath').optional({ nullable: true }).isString().isLength({ max: 700 }).withMessage('filePath max length is 700'),
  body('externalUrl').optional({ nullable: true }).isURL().isLength({ max: 1200 }).withMessage('externalUrl must be a valid URL'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('trackNumber').optional({ nullable: true }).isInt({ min: 1 }).withMessage('trackNumber must be positive'),
  body('discNumber').optional({ nullable: true }).isInt({ min: 1 }).withMessage('discNumber must be positive'),
  body('playbackBitrateKbps').optional({ nullable: true }).isInt({ min: 1 }).withMessage('playbackBitrateKbps must be positive'),
  body('isExplicit').optional().isBoolean().withMessage('isExplicit must be boolean'),
  body('releaseDate').optional({ nullable: true }).isISO8601().withMessage('releaseDate must be a valid date'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

const updateSongValidation = [
  ...idParamValidation,
  body('artistId').optional().isInt({ min: 1 }).withMessage('artistId must be a positive integer'),
  body('albumId').optional({ nullable: true }).isInt({ min: 1 }).withMessage('albumId must be a positive integer'),
  body('genreId').optional().isInt({ min: 1 }).withMessage('genreId must be a positive integer'),
  body('title').optional().trim().isLength({ min: 1, max: 220 }).withMessage('title must be max 220 chars'),
  body('durationSeconds').optional().isInt({ min: 1 }).withMessage('durationSeconds must be greater than 0'),
  body('sourceType').optional().isIn(['local', 'external']).withMessage('sourceType must be local or external'),
  body('filePath').optional({ nullable: true }).isString().isLength({ max: 700 }).withMessage('filePath max length is 700'),
  body('externalUrl').optional({ nullable: true }).isURL().isLength({ max: 1200 }).withMessage('externalUrl must be a valid URL'),
  body('coverImageUrl').optional({ nullable: true }).isURL().isLength({ max: 500 }).withMessage('coverImageUrl must be a valid URL'),
  body('trackNumber').optional({ nullable: true }).isInt({ min: 1 }).withMessage('trackNumber must be positive'),
  body('discNumber').optional({ nullable: true }).isInt({ min: 1 }).withMessage('discNumber must be positive'),
  body('playbackBitrateKbps').optional({ nullable: true }).isInt({ min: 1 }).withMessage('playbackBitrateKbps must be positive'),
  body('isExplicit').optional().isBoolean().withMessage('isExplicit must be boolean'),
  body('releaseDate').optional({ nullable: true }).isISO8601().withMessage('releaseDate must be a valid date'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

const updateSongStatusValidation = [
  ...idParamValidation,
  body('isActive').isBoolean().withMessage('isActive is required and must be boolean')
];

module.exports = {
  idParamValidation,
  listSongsValidation,
  createSongValidation,
  updateSongValidation,
  updateSongStatusValidation
};
