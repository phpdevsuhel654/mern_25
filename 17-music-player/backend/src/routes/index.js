'use strict';

const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const songRoutes = require('./song.routes');
const playlistRoutes = require('./playlist.routes');
const streamingRoutes = require('./streaming.routes');

const router = express.Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/songs', songRoutes);
router.use('/playlists', playlistRoutes);
router.use('/stream', streamingRoutes);

module.exports = router;
