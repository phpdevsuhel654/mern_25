'use strict';

const express = require('express');

const streamingController = require('../controllers/streaming.controller');
const authenticate = require('../middleware/authenticate');
const validateRequest = require('../middleware/validateRequest');
const {
  songIdParamValidation,
  playValidation,
  pauseValidation,
  volumeValidation,
  playbackModeValidation,
  addQueueValidation,
  reorderQueueValidation
} = require('../validations/streaming.validation');

const router = express.Router();

router.use(authenticate);

router.get('/state', streamingController.getPlaybackState);
router.get('/songs/:songId/source', songIdParamValidation, validateRequest, streamingController.getStreamSource);
router.post('/play', playValidation, validateRequest, streamingController.playSong);
router.post('/pause', pauseValidation, validateRequest, streamingController.pausePlayback);
router.post('/resume', streamingController.resumePlayback);
router.post('/next', streamingController.nextTrack);
router.post('/previous', streamingController.previousTrack);
router.patch('/volume', volumeValidation, validateRequest, streamingController.updateVolume);
router.patch('/mode', playbackModeValidation, validateRequest, streamingController.updatePlaybackMode);

router.post('/queue', addQueueValidation, validateRequest, streamingController.addToQueue);
router.delete('/queue/:songId', songIdParamValidation, validateRequest, streamingController.removeFromQueue);
router.delete('/queue', streamingController.clearQueue);
router.patch('/queue/reorder', reorderQueueValidation, validateRequest, streamingController.reorderQueue);

router.get('/files/:songId', songIdParamValidation, validateRequest, streamingController.streamLocalFile);

module.exports = router;
