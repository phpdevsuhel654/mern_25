'use strict';

const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const httpStatus = require('../constants/httpStatus');
const playlistService = require('../services/playlist.service');

const listMyPlaylists = asyncHandler(async (req, res) => {
  const payload = await playlistService.listMyPlaylists(req.user, req.query);
  return success(res, payload, httpStatus.OK);
});

const listPublicPlaylists = asyncHandler(async (req, res) => {
  const payload = await playlistService.listPublicPlaylists(req.query);
  return success(res, payload, httpStatus.OK);
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const actor = req.user || null;
  const payload = await playlistService.getPlaylistById(Number(req.params.id), actor);
  return success(res, payload, httpStatus.OK);
});

const createPlaylist = asyncHandler(async (req, res) => {
  const payload = await playlistService.createPlaylist(req.body, req.user);
  return success(res, { playlist: payload }, httpStatus.CREATED);
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const payload = await playlistService.updatePlaylist(Number(req.params.id), req.body, req.user);
  return success(res, { playlist: payload }, httpStatus.OK);
});

const deletePlaylist = asyncHandler(async (req, res) => {
  await playlistService.deletePlaylist(Number(req.params.id), req.user);
  return success(res, { deleted: true }, httpStatus.OK);
});

const addSong = asyncHandler(async (req, res) => {
  const songs = await playlistService.addSong(Number(req.params.id), req.body, req.user);
  return success(res, { songs }, httpStatus.OK);
});

const removeSong = asyncHandler(async (req, res) => {
  const songs = await playlistService.removeSong(Number(req.params.id), Number(req.params.songId), req.user);
  return success(res, { songs }, httpStatus.OK);
});

const reorderSongs = asyncHandler(async (req, res) => {
  const songs = await playlistService.reorderSongs(Number(req.params.id), req.body.orderedSongIds, req.user);
  return success(res, { songs }, httpStatus.OK);
});

module.exports = {
  listMyPlaylists,
  listPublicPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  reorderSongs
};
