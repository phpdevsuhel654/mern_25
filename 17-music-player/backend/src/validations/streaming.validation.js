'use strict';

const { body, param } = require('express-validator');

const songIdParamValidation = [
  param('songId').isInt({ min: 1 }).withMessage('songId must be a positive integer')
];

const playValidation = [
  body('songId').isInt({ min: 1 }).withMessage('songId must be a positive integer'),
  body('positionSeconds').optional().isInt({ min: 0 }).withMessage('positionSeconds must be >= 0'),
  body('playSource').optional().isIn(['library', 'playlist', 'external']).withMessage('playSource is invalid'),
  body('contextRef').optional({ nullable: true }).isLength({ max: 120 }).withMessage('contextRef max length is 120')
];

const pauseValidation = [
  body('positionSeconds').optional().isInt({ min: 0 }).withMessage('positionSeconds must be >= 0')
];

const volumeValidation = [
  body('volumePercent').isInt({ min: 0, max: 100 }).withMessage('volumePercent must be between 0 and 100')
];

const playbackModeValidation = [
  body('shuffleEnabled').optional().isBoolean().withMessage('shuffleEnabled must be boolean'),
  body('repeatMode').optional().isIn(['off', 'one', 'all']).withMessage('repeatMode must be off, one, or all')
];

const addQueueValidation = [
  body('songId').isInt({ min: 1 }).withMessage('songId must be a positive integer'),
  body('position').optional().isInt({ min: 1 }).withMessage('position must be >= 1'),
  body('sourceType').optional().isIn(['manual', 'playlist', 'autoplay']).withMessage('sourceType is invalid'),
  body('sourceRef').optional({ nullable: true }).isLength({ max: 120 }).withMessage('sourceRef max length is 120')
];

const reorderQueueValidation = [
  body('orderedSongIds').isArray({ min: 1 }).withMessage('orderedSongIds must be a non-empty array'),
  body('orderedSongIds.*').isInt({ min: 1 }).withMessage('orderedSongIds values must be positive integers')
];

module.exports = {
  songIdParamValidation,
  playValidation,
  pauseValidation,
  volumeValidation,
  playbackModeValidation,
  addQueueValidation,
  reorderQueueValidation
};
