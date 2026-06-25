-- Phase 7 migration: streaming state and queue tables
-- MySQL 8.0+

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE playback_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  current_song_id BIGINT UNSIGNED NULL,
  status ENUM('stopped', 'playing', 'paused') NOT NULL DEFAULT 'stopped',
  current_position_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  volume_percent TINYINT UNSIGNED NOT NULL DEFAULT 80,
  shuffle_enabled TINYINT(1) NOT NULL DEFAULT 0,
  repeat_mode ENUM('off', 'one', 'all') NOT NULL DEFAULT 'off',
  queue_version INT UNSIGNED NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_playback_sessions_user_id (user_id),
  KEY idx_playback_sessions_song_id (current_song_id),
  CONSTRAINT fk_playback_sessions_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_playback_sessions_song_id FOREIGN KEY (current_song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE SET NULL,
  CONSTRAINT chk_playback_sessions_position CHECK (current_position_seconds >= 0),
  CONSTRAINT chk_playback_sessions_volume CHECK (volume_percent BETWEEN 0 AND 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE playback_queue (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  position INT UNSIGNED NOT NULL,
  source_type ENUM('manual', 'playlist', 'autoplay') NOT NULL DEFAULT 'manual',
  source_ref VARCHAR(120) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_playback_queue_user_position (user_id, position),
  UNIQUE KEY uq_playback_queue_user_song (user_id, song_id),
  KEY idx_playback_queue_song_id (song_id),
  CONSTRAINT fk_playback_queue_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT fk_playback_queue_song_id FOREIGN KEY (song_id) REFERENCES songs(id)
    ON UPDATE RESTRICT ON DELETE CASCADE,
  CONSTRAINT chk_playback_queue_position CHECK (position > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
