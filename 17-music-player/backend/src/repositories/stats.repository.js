'use strict';

const { query } = require('../config/db');

const getOverview = async () => {
  const [
    songsRows,
    artistsRows,
    albumsRows,
    genresRows,
    playlistsRows,
    usersRows,
    recentRows,
    likesRows,
    viewsRows
  ] = await Promise.all([
    query('SELECT COUNT(*) AS total FROM songs'),
    query('SELECT COUNT(*) AS total FROM artists'),
    query('SELECT COUNT(*) AS total FROM albums'),
    query('SELECT COUNT(*) AS total FROM genres'),
    query('SELECT COUNT(*) AS total FROM playlists'),
    query("SELECT COUNT(*) AS total FROM users WHERE deleted_at IS NULL"),
    query('SELECT COUNT(*) AS total FROM recently_played WHERE played_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'),
    query('SELECT COUNT(*) AS total FROM song_likes'),
    query('SELECT COUNT(*) AS total FROM song_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)')
  ]);

  return {
    songs: songsRows[0]?.total || 0,
    artists: artistsRows[0]?.total || 0,
    albums: albumsRows[0]?.total || 0,
    genres: genresRows[0]?.total || 0,
    playlists: playlistsRows[0]?.total || 0,
    users: usersRows[0]?.total || 0,
    recentPlays7d: recentRows[0]?.total || 0,
    songLikes: likesRows[0]?.total || 0,
    songViews30d: viewsRows[0]?.total || 0
  };
};

module.exports = {
  getOverview
};
