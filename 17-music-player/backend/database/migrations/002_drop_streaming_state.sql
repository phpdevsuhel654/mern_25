-- Phase 7 rollback migration

SET NAMES utf8mb4;
SET time_zone = '+00:00';

DROP TABLE IF EXISTS playback_queue;
DROP TABLE IF EXISTS playback_sessions;
