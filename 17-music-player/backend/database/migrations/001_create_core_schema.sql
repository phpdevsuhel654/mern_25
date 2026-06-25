-- Phase 2 migration: core schema
-- MySQL 8.0+

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NULL,
  is_system TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(60) NOT NULL,
  email VARCHAR(191) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500) NULL,
  bio VARCHAR(500) NULL,
  status ENUM('active', 'suspended', 'deleted') NOT NULL DEFAULT 'active',
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role_id (role_id),
  KEY idx_users_status (status),
  CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) REFERENCES roles(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE artists (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(170) NOT NULL,
  bio TEXT NULL,
  image_url VARCHAR(500) NULL,
  country VARCHAR(80) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_artists_slug (slug),
  UNIQUE KEY uq_artists_name (name),
  FULLTEXT KEY ftx_artists_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE genres (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_genres_name (name),
  UNIQUE KEY uq_genres_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE albums (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  artist_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  cover_image_url VARCHAR(500) NULL,
  release_date DATE NULL,
  label_name VARCHAR(150) NULL,
  total_tracks INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_albums_slug (slug),
  KEY idx_albums_artist_id (artist_id),
  KEY idx_albums_release_date (release_date),
  FULLTEXT KEY ftx_albums_title (title),
  CONSTRAINT fk_albums_artist_id FOREIGN KEY (artist_id) REFERENCES artists(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE songs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  artist_id BIGINT UNSIGNED NOT NULL,
  album_id BIGINT UNSIGNED NULL,
  genre_id BIGINT UNSIGNED NOT NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  duration_seconds INT UNSIGNED NOT NULL,
  source_type ENUM('local', 'external') NOT NULL,
  file_path VARCHAR(700) NULL,
  external_url VARCHAR(1200) NULL,
  cover_image_url VARCHAR(500) NULL,
  track_number INT UNSIGNED NULL,
  disc_number INT UNSIGNED NULL,
  playback_bitrate_kbps INT UNSIGNED NULL,
  is_explicit TINYINT(1) NOT NULL DEFAULT 0,
  release_date DATE NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_songs_slug (slug),
  KEY idx_songs_artist_id (artist_id),
  KEY idx_songs_album_id (album_id),
  KEY idx_songs_genre_id (genre_id),
  KEY idx_songs_created_by_user_id (created_by_user_id),
  KEY idx_songs_active_release (is_active, release_date),
  FULLTEXT KEY ftx_songs_title (title),
  CONSTRAINT fk_songs_artist_id FOREIGN KEY (artist_id) REFERENCES artists(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_songs_album_id FOREIGN KEY (album_id) REFERENCES albums(id)
    ON UPDATE RESTRICT ON DELETE SET NULL,
  CONSTRAINT fk_songs_genre_id FOREIGN KEY (genre_id) REFERENCES genres(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_songs_created_by_user_id FOREIGN KEY (created_by_user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE SET NULL,
  CONSTRAINT chk_songs_duration_positive CHECK (duration_seconds > 0),
  CONSTRAINT chk_songs_source_payload CHECK (
    (source_type = 'local' AND file_path IS NOT NULL AND external_url IS NULL) OR
    (source_type = 'external' AND external_url IS NOT NULL)
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE playlists (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  description VARCHAR(500) NULL,
  cover_image_url VARCHAR(500) NULL,
  is_public TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_playlists_user_name (user_id, name),
  KEY idx_playlists_user_id (user_id),
  KEY idx_playlists_public_created (is_public, created_at),
  CONSTRAINT fk_playlists_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE playlist_songs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  playlist_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  position INT UNSIGNED NOT NULL,
  added_by_user_id BIGINT UNSIGNED NULL,
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_playlist_songs_position (playlist_id, position),
  UNIQUE KEY uq_playlist_songs_unique_song (playlist_id, song_id),
  KEY idx_playlist_songs_playlist_id (playlist_id),
  KEY idx_playlist_songs_song_id (song_id),
  KEY idx_playlist_songs_added_by_user_id (added_by_user_id),
  CONSTRAINT fk_playlist_songs_playlist_id FOREIGN KEY (playlist_id) REFERENCES playlists(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_playlist_songs_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_playlist_songs_added_by_user_id FOREIGN KEY (added_by_user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE SET NULL,
  CONSTRAINT chk_playlist_songs_position_positive CHECK (position > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE favorites (
  user_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, song_id),
  KEY idx_favorites_song_id (song_id),
  CONSTRAINT fk_favorites_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_favorites_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE recently_played (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  play_source ENUM('library', 'playlist', 'external') NOT NULL DEFAULT 'library',
  context_ref VARCHAR(120) NULL,
  PRIMARY KEY (id),
  KEY idx_recently_played_user_time (user_id, played_at),
  KEY idx_recently_played_song_time (song_id, played_at),
  CONSTRAINT fk_recently_played_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_recently_played_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE song_views (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  song_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  source ENUM('library', 'playlist', 'external') NOT NULL DEFAULT 'library',
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  PRIMARY KEY (id),
  KEY idx_song_views_song_time (song_id, viewed_at),
  KEY idx_song_views_user_time (user_id, viewed_at),
  CONSTRAINT fk_song_views_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_song_views_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE song_likes (
  user_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, song_id),
  KEY idx_song_likes_song_id (song_id),
  CONSTRAINT fk_song_likes_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_song_likes_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (name, description, is_system)
VALUES
  ('admin', 'Administrator role with full permissions', 1),
  ('user', 'Standard user role', 1);
