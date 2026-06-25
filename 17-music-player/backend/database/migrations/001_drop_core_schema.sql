-- Phase 2 rollback: core schema
-- Drop in reverse dependency order

SET NAMES utf8mb4;
SET time_zone = '+00:00';

DROP TABLE IF EXISTS song_likes;
DROP TABLE IF EXISTS song_views;
DROP TABLE IF EXISTS recently_played;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
