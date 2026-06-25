'use strict';

const express = require('express');

const playlistController = require('../controllers/playlist.controller');
const authenticate = require('../middleware/authenticate');
const validateRequest = require('../middleware/validateRequest');
const {
  idParamValidation,
  listValidation,
  createValidation,
  updateValidation,
  addSongValidation,
  removeSongValidation,
  reorderSongsValidation
} = require('../validations/playlist.validation');

const router = express.Router();

router.get('/public', listValidation, validateRequest, playlistController.listPublicPlaylists);
router.get('/mine/list', authenticate, listValidation, validateRequest, playlistController.listMyPlaylists);
router.get('/:id', idParamValidation, validateRequest, playlistController.getPlaylistById);
router.post('/', authenticate, createValidation, validateRequest, playlistController.createPlaylist);
router.patch('/:id', authenticate, updateValidation, validateRequest, playlistController.updatePlaylist);
router.delete('/:id', authenticate, idParamValidation, validateRequest, playlistController.deletePlaylist);

router.post('/:id/songs', authenticate, addSongValidation, validateRequest, playlistController.addSong);
router.delete('/:id/songs/:songId', authenticate, removeSongValidation, validateRequest, playlistController.removeSong);
router.patch('/:id/songs/reorder', authenticate, reorderSongsValidation, validateRequest, playlistController.reorderSongs);

module.exports = router;
