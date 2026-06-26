'use strict';

const { body, param } = require('express-validator');

const idParamValidation = [param('id').isInt({ min: 1 }).withMessage('id must be a positive integer')];

const createUploadValidation = [
  body('fileName').trim().isLength({ min: 1, max: 255 }).withMessage('fileName is required'),
  body('fileType').isIn(['audio', 'cover']).withMessage('fileType must be audio or cover'),
  body('sizeMb').isFloat({ min: 0 }).withMessage('sizeMb must be >= 0'),
  body('source').isIn(['local', 'external']).withMessage('source must be local or external'),
  body('status').isIn(['processing', 'processed', 'failed']).withMessage('status invalid')
];

const updateUploadValidation = [
  ...idParamValidation,
  body('fileName').optional().trim().isLength({ min: 1, max: 255 }).withMessage('fileName is required'),
  body('fileType').optional().isIn(['audio', 'cover']).withMessage('fileType must be audio or cover'),
  body('sizeMb').optional().isFloat({ min: 0 }).withMessage('sizeMb must be >= 0'),
  body('source').optional().isIn(['local', 'external']).withMessage('source must be local or external'),
  body('status').optional().isIn(['processing', 'processed', 'failed']).withMessage('status invalid')
];

module.exports = {
  idParamValidation,
  createUploadValidation,
  updateUploadValidation
};
