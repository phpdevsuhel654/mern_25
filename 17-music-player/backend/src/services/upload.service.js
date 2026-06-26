'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const uploadRepository = require('../repositories/upload.repository');

const listUploads = async () => {
  const items = await uploadRepository.list();
  return {
    items
  };
};

const createUpload = async (payload) => {
  return uploadRepository.create(payload);
};

const updateUpload = async (uploadId, payload) => {
  const item = await uploadRepository.update(uploadId, payload);

  if (!item) {
    throw new AppError('Upload record not found', httpStatus.NOT_FOUND);
  }

  return item;
};

const deleteUpload = async (uploadId) => {
  await uploadRepository.remove(uploadId);
};

module.exports = {
  listUploads,
  createUpload,
  updateUpload,
  deleteUpload
};
