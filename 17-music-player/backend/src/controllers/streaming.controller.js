'use strict';

const fs = require('fs');

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const streamingService = require('../services/streaming.service');

const getPlaybackState = asyncHandler(async (req, res) => {
  const payload = await streamingService.getPlaybackState(req.user.userId);
  return success(res, payload, httpStatus.OK);
});

const getStreamSource = asyncHandler(async (req, res) => {
  const payload = await streamingService.getStreamSource(Number(req.params.songId), req.user.userId);
  return success(res, payload, httpStatus.OK);
});

const playSong = asyncHandler(async (req, res) => {
  const payload = await streamingService.playSong({
    userId: req.user.userId,
    songId: Number(req.body.songId),
    playSource: req.body.playSource,
    contextRef: req.body.contextRef,
    positionSeconds: req.body.positionSeconds
  });

  return success(res, payload, httpStatus.OK);
});

const pausePlayback = asyncHandler(async (req, res) => {
  const payload = await streamingService.pausePlayback(req.user.userId, req.body.positionSeconds);
  return success(res, payload, httpStatus.OK);
});

const resumePlayback = asyncHandler(async (req, res) => {
  const payload = await streamingService.resumePlayback(req.user.userId);
  return success(res, payload, httpStatus.OK);
});

const nextTrack = asyncHandler(async (req, res) => {
  const payload = await streamingService.moveTrack(req.user.userId, 'next');
  return success(res, payload, httpStatus.OK);
});

const previousTrack = asyncHandler(async (req, res) => {
  const payload = await streamingService.moveTrack(req.user.userId, 'previous');
  return success(res, payload, httpStatus.OK);
});

const updateVolume = asyncHandler(async (req, res) => {
  const payload = await streamingService.setVolume(req.user.userId, req.body.volumePercent);
  return success(res, payload, httpStatus.OK);
});

const updatePlaybackMode = asyncHandler(async (req, res) => {
  const payload = await streamingService.setPlaybackMode(req.user.userId, {
    shuffleEnabled: req.body.shuffleEnabled,
    repeatMode: req.body.repeatMode
  });

  return success(res, payload, httpStatus.OK);
});

const addToQueue = asyncHandler(async (req, res) => {
  const queue = await streamingService.addToQueue(req.user.userId, req.body);
  return success(res, { queue }, httpStatus.OK);
});

const removeFromQueue = asyncHandler(async (req, res) => {
  const queue = await streamingService.removeFromQueue(req.user.userId, Number(req.params.songId));
  return success(res, { queue }, httpStatus.OK);
});

const clearQueue = asyncHandler(async (req, res) => {
  const queue = await streamingService.clearQueue(req.user.userId);
  return success(res, { queue }, httpStatus.OK);
});

const reorderQueue = asyncHandler(async (req, res) => {
  const queue = await streamingService.reorderQueue(req.user.userId, req.body.orderedSongIds);
  return success(res, { queue }, httpStatus.OK);
});

const streamLocalFile = asyncHandler(async (req, res) => {
  const file = await streamingService.resolveLocalFilePath(Number(req.params.songId));

  if (!fs.existsSync(file.absolutePath)) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Media file not found on server'
    });
  }

  return res.sendFile(file.absolutePath);
});

module.exports = {
  getPlaybackState,
  getStreamSource,
  playSong,
  pausePlayback,
  resumePlayback,
  nextTrack,
  previousTrack,
  updateVolume,
  updatePlaybackMode,
  addToQueue,
  removeFromQueue,
  clearQueue,
  reorderQueue,
  streamLocalFile
};
