'use strict';

const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const AppError = require('../utils/AppError');

const uploadFile = async (req, res, next) => {
  try {
    if (!req.uploadedFile) {
      return next(new AppError('No file uploaded', httpStatus.BAD_REQUEST));
    }

    return success(res, {
      url: req.uploadedFile.url,
      filename: req.uploadedFile.filename
    }, httpStatus.OK);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile
};
