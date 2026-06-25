'use strict';

const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError('Validation failed', httpStatus.BAD_REQUEST, {
        errors: errors.array({ onlyFirstError: true })
      })
    );
  }

  next();
};

module.exports = validateRequest;
