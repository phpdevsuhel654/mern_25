'use strict';

const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const songRoutes = require('./song.routes');
const playlistRoutes = require('./playlist.routes');
const streamingRoutes = require('./streaming.routes');
const artistRoutes = require('./artist.routes');
const albumRoutes = require('./album.routes');
const genreRoutes = require('./genre.routes');
const adminUserRoutes = require('./adminUser.routes');
const uploadRoutes = require('./upload.routes');
const fileUploadRoutes = require('./file-upload.routes');
const statsRoutes = require('./stats.routes');

const router = express.Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/songs', songRoutes);
router.use('/playlists', playlistRoutes);
router.use('/stream', streamingRoutes);
router.use('/artists', artistRoutes);
router.use('/albums', albumRoutes);
router.use('/genres', genreRoutes);
router.use('/users', adminUserRoutes);
router.use('/upload', fileUploadRoutes);
router.use('/uploads', uploadRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
