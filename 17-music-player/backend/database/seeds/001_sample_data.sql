-- Sample Data Seeding Script
-- MySQL 8.0+
-- Run after: 001_create_core_schema.sql

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

-- Insert admin user: admin@example.com / Admin@123
INSERT INTO users (role_id, full_name, username, email, password_hash, avatar_url, bio, status)
VALUES (
  1,
  'Admin User',
  'admin',
  'admin@example.com',
  '$2a$12$nd1drHL1Ilac/LK1wp6b8ucVyOU.8xWLNasHyNxv.awKdd80ctePm', -- Admin@123 hashed with bcrypt
  'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  'Music platform administrator with full system access',
  'active'
);

-- Insert regular users
INSERT INTO users (role_id, full_name, username, email, password_hash, avatar_url, bio, status)
VALUES
(
  2,
  'John Doe',
  'johndoe',
  'john@example.com',
  '$2a$12$nd1drHL1Ilac/LK1wp6b8ucVyOU.8xWLNasHyNxv.awKdd80ctePm', -- Admin@123
  'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  'Music lover and playlist curator',
  'active'
),
(
  2,
  'Jane Smith',
  'janesmith',
  'jane@example.com',
  '$2a$12$nd1drHL1Ilac/LK1wp6b8ucVyOU.8xWLNasHyNxv.awKdd80ctePm',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  'Podcast enthusiast and music producer',
  'active'
),
(
  2,
  'Mike Johnson',
  'mikej',
  'mike@example.com',
  '$2a$12$nd1drHL1Ilac/LK1wp6b8ucVyOU.8xWLNasHyNxv.awKdd80ctePm',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
  'Electronic music producer',
  'active'
),
(
  2,
  'Sarah Wilson',
  'sarahw',
  'sarah@example.com',
  '$2a$12$nd1drHL1Ilac/LK1wp6b8ucVyOU.8xWLNasHyNxv.awKdd80ctePm',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  'Jazz connoisseur and audiophile',
  'active'
);

-- ============================================================================
-- GENRES
-- ============================================================================

INSERT INTO genres (name, slug, description, is_active)
VALUES
('Rock', 'rock', 'Classic rock, alternative, and indie rock music', 1),
('Pop', 'pop', 'Popular music for the masses', 1),
('Hip Hop', 'hip-hop', 'Hip hop and rap music', 1),
('Electronic', 'electronic', 'Electronic, EDM, and techno music', 1),
('Jazz', 'jazz', 'Jazz standards and contemporary jazz', 1),
('R&B', 'r-b', 'Rhythm and blues and soul music', 1),
('Country', 'country', 'Country music and Americana', 1),
('Classical', 'classical', 'Classical symphonies and compositions', 1),
('Metal', 'metal', 'Heavy metal and extreme metal', 1),
('Indie', 'indie', 'Independent and alternative music', 1);

-- ============================================================================
-- ARTISTS
-- ============================================================================

INSERT INTO artists (name, slug, bio, image_url, country, is_active)
VALUES
('The Beatles', 'the-beatles', 'British rock band formed in Liverpool in 1960. One of the most influential and successful groups in music history.', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400', 'United Kingdom', 1),
('David Bowie', 'david-bowie', 'English singer-songwriter and actor. A prolific figure in music, known for constant reinvention and innovation.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'United Kingdom', 1),
('Miles Davis', 'miles-davis', 'American jazz trumpeter and composer. One of the most influential figures in jazz, a pioneer of modal jazz and fusion.', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 'United States', 1),
('Adele', 'adele', 'British singer-songwriter known for powerful voice and emotional ballads. Multiple Grammy and Oscar winner.', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 'United Kingdom', 1),
('Kendrick Lamar', 'kendrick-lamar', 'American rapper and songwriter from Compton. Pulitzer Prize winner for music, acclaimed for artistic excellence.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 'United States', 1),
('Daft Punk', 'daft-punk', 'French electronic music duo known for innovative house and funk music. Influential in electronic dance music.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'France', 1),
('Taylor Swift', 'taylor-swift', 'American singer-songwriter with multiple Grammy Awards. Known for narrative songwriting and chart success.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'United States', 1),
('John Coltrane', 'john-coltrane', 'American jazz saxophonist and composer. A pioneer of modal jazz and free jazz, with a spiritual and experimental approach.', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 'United States', 1),
('Metallica', 'metallica', 'American heavy metal band formed in 1981. One of the most commercially successful metal bands worldwide.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 'United States', 1),
('Billie Eilish', 'billie-eilish', 'American singer and songwriter known for distinctive whisper vocal delivery and minimalist dark style.', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 'United States', 1);

-- ============================================================================
-- ALBUMS
-- ============================================================================

INSERT INTO albums (artist_id, title, slug, cover_image_url, release_date, label_name, total_tracks, is_active)
VALUES
(1, 'Abbey Road', 'abbey-road', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1969-09-26', 'Apple Records', 17, 1),
(1, 'The White Album', 'the-white-album', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1968-11-22', 'Apple Records', 30, 1),
(2, 'Ziggy Stardust and the Spiders from Mars', 'ziggy-stardust', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1972-06-16', 'RCA Records', 11, 1),
(2, 'Aladdin Sane', 'aladdin-sane', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1973-04-13', 'RCA Records', 10, 1),
(3, 'Kind of Blue', 'kind-of-blue', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1959-03-02', 'Columbia Records', 5, 1),
(3, 'Bitches Brew', 'bitches-brew', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1970-03-28', 'Columbia Records', 5, 1),
(4, '25', '25', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2015-11-20', 'XL Recordings', 11, 1),
(4, '21', '21', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2011-02-18', 'XL Recordings', 11, 1),
(5, 'good kid, m.A.A.d city', 'good-kid-maad-city', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2012-10-22', 'Top Dawg', 13, 1),
(5, 'To Pimp a Butterfly', 'to-pimp-a-butterfly', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2015-03-15', 'Top Dawg', 14, 1),
(6, 'Homework', 'homework', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1997-01-20', 'Virgin Records', 11, 1),
(6, 'Discovery', 'discovery', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2001-03-12', 'Virgin Records', 14, 1),
(7, 'Fearless', 'fearless', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2008-11-11', 'Big Machine', 13, 1),
(7, '1989', '1989', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2014-10-27', 'Big Machine', 13, 1),
(8, 'Giant Steps', 'giant-steps', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1960-02-02', 'Atlantic Records', 8, 1),
(8, 'A Love Supreme', 'a-love-supreme', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1964-12-10', 'Impulse Records', 4, 1),
(9, 'Master of Puppets', 'master-of-puppets', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1986-03-03', 'Elektra', 8, 1),
(9, 'The Black Album', 'the-black-album', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '1991-08-12', 'Elektra', 12, 1),
(10, 'When We All Fall Asleep, Where Do We Go?', 'when-we-all-fall-asleep', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2019-03-29', 'Darkroom', 13, 1),
(10, 'Happier Than Ever', 'happier-than-ever', 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400', '2021-07-30', 'Darkroom', 13, 1);

-- ============================================================================
-- SONGS
-- ============================================================================

INSERT INTO songs (artist_id, album_id, genre_id, created_by_user_id, title, slug, duration_seconds, source_type, file_path, external_url, cover_image_url, track_number, disc_number, playback_bitrate_kbps, is_explicit, release_date, is_active)
VALUES
-- Abbey Road (The Beatles)
(1, 1, 1, 1, 'Come Together', 'come-together', 259, 'external', NULL, 'https://music.example.com/songs/come-together.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1, 1, 320, 0, '1969-09-26', 1),
(1, 1, 1, 1, 'Something', 'something', 183, 'external', NULL, 'https://music.example.com/songs/something.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 2, 1, 320, 0, '1969-09-26', 1),
(1, 1, 1, 1, 'Maxwell\'s Silver Hammer', 'maxwells-silver-hammer', 207, 'external', NULL, 'https://music.example.com/songs/maxwell-silver-hammer.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 3, 1, 320, 0, '1969-09-26', 1),
(1, 1, 1, 1, 'Oh! Darling', 'oh-darling', 207, 'external', NULL, 'https://music.example.com/songs/oh-darling.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 4, 1, 320, 0, '1969-09-26', 1),
(1, 1, 1, 1, 'Octopus\'s Garden', 'octopus-s-garden', 171, 'external', NULL, 'https://music.example.com/songs/octopus-garden.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 5, 1, 320, 0, '1969-09-26', 1),

-- The White Album (The Beatles)
(1, 2, 1, 1, 'Back in the U.S.S.R.', 'back-in-the-ussr', 256, 'external', NULL, 'https://music.example.com/songs/back-in-ussr.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1, 1, 320, 0, '1968-11-22', 1),
(1, 2, 1, 1, 'Dear Prudence', 'dear-prudence', 256, 'external', NULL, 'https://music.example.com/songs/dear-prudence.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 2, 1, 320, 0, '1968-11-22', 1),
(1, 2, 1, 1, 'Glass Onion', 'glass-onion', 246, 'external', NULL, 'https://music.example.com/songs/glass-onion.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 3, 1, 320, 0, '1968-11-22', 1),

-- Ziggy Stardust (David Bowie)
(2, 3, 1, 1, 'Five Years', 'five-years', 294, 'external', NULL, 'https://music.example.com/songs/five-years.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1, 1, 320, 0, '1972-06-16', 1),
(2, 3, 1, 1, 'Soul Love', 'soul-love', 194, 'external', NULL, 'https://music.example.com/songs/soul-love.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 2, 1, 320, 0, '1972-06-16', 1),
(2, 3, 1, 1, 'Moonage Daydream', 'moonage-daydream', 426, 'external', NULL, 'https://music.example.com/songs/moonage-daydream.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 3, 1, 320, 0, '1972-06-16', 1),

-- Kind of Blue (Miles Davis)
(3, 5, 5, 1, 'So What', 'so-what', 567, 'external', NULL, 'https://music.example.com/songs/so-what.mp3', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 1, 1, 320, 0, '1959-03-02', 1),
(3, 5, 5, 1, 'Freddie Freeloader', 'freddie-freeloader', 560, 'external', NULL, 'https://music.example.com/songs/freddie-freeloader.mp3', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 2, 1, 320, 0, '1959-03-02', 1),
(3, 5, 5, 1, 'Blue in Green', 'blue-in-green', 566, 'external', NULL, 'https://music.example.com/songs/blue-in-green.mp3', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 3, 1, 320, 0, '1959-03-02', 1),

-- 25 (Adele)
(4, 7, 2, 1, 'Hello', 'hello', 295, 'external', NULL, 'https://music.example.com/songs/hello.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 1, 1, 320, 0, '2015-11-20', 1),
(4, 7, 2, 1, 'I Miss You', 'i-miss-you', 238, 'external', NULL, 'https://music.example.com/songs/i-miss-you.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 2, 1, 320, 0, '2015-11-20', 1),
(4, 7, 2, 1, 'When We Were Young', 'when-we-were-young', 323, 'external', NULL, 'https://music.example.com/songs/when-we-were-young.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 3, 1, 320, 0, '2015-11-20', 1),

-- good kid, m.A.A.d city (Kendrick Lamar)
(5, 9, 3, 1, 'Bitch, Don\'t Kill My Vibe', 'bitch-dont-kill-my-vibe', 338, 'external', NULL, 'https://music.example.com/songs/bitch-dont-kill-my-vibe.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 2, 1, 320, 1, '2012-10-22', 1),
(5, 9, 3, 1, 'The Art of Peer Pressure', 'the-art-of-peer-pressure', 409, 'external', NULL, 'https://music.example.com/songs/art-of-peer-pressure.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 3, 1, 320, 1, '2012-10-22', 1),
(5, 9, 3, 1, 'Money Trees', 'money-trees', 362, 'external', NULL, 'https://music.example.com/songs/money-trees.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 4, 1, 320, 1, '2012-10-22', 1),

-- Discovery (Daft Punk)
(6, 12, 4, 1, 'One More Time', 'one-more-time', 320, 'external', NULL, 'https://music.example.com/songs/one-more-time.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 1, 1, 320, 0, '2001-03-12', 1),
(6, 12, 4, 1, 'Digital Love', 'digital-love', 290, 'external', NULL, 'https://music.example.com/songs/digital-love.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 2, 1, 320, 0, '2001-03-12', 1),
(6, 12, 4, 1, 'Harder, Better, Faster, Stronger', 'harder-better-faster-stronger', 224, 'external', NULL, 'https://music.example.com/songs/harder-better.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 3, 1, 320, 0, '2001-03-12', 1),

-- 1989 (Taylor Swift)
(7, 14, 2, 1, 'Style', 'style', 231, 'external', NULL, 'https://music.example.com/songs/style.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 3, 1, 320, 0, '2014-10-27', 1),
(7, 14, 2, 1, 'Wildest Dreams', 'wildest-dreams', 220, 'external', NULL, 'https://music.example.com/songs/wildest-dreams.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 4, 1, 320, 0, '2014-10-27', 1),
(7, 14, 2, 1, 'Clean', 'clean', 263, 'external', NULL, 'https://music.example.com/songs/clean.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 13, 1, 320, 0, '2014-10-27', 1),

-- A Love Supreme (John Coltrane)
(8, 16, 5, 1, 'A Love Supreme', 'a-love-supreme-song', 466, 'external', NULL, 'https://music.example.com/songs/a-love-supreme-song.mp3', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 1, 1, 320, 0, '1964-12-10', 1),
(8, 16, 5, 1, 'Part 2 - Resolution', 'part-2-resolution', 430, 'external', NULL, 'https://music.example.com/songs/part-2-resolution.mp3', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 2, 1, 320, 0, '1964-12-10', 1),

-- Master of Puppets (Metallica)
(9, 17, 9, 1, 'Master of Puppets', 'master-of-puppets-song', 516, 'external', NULL, 'https://music.example.com/songs/master-of-puppets-song.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1, 1, 320, 1, '1986-03-03', 1),
(9, 17, 9, 1, 'The Thing That Should Not Be', 'the-thing-that-should-not-be', 396, 'external', NULL, 'https://music.example.com/songs/thing-should-not-be.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 2, 1, 320, 1, '1986-03-03', 1),
(9, 17, 9, 1, 'Welcome Home (Sanitarium)', 'welcome-home-sanitarium', 426, 'external', NULL, 'https://music.example.com/songs/welcome-home.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 3, 1, 320, 1, '1986-03-03', 1),

-- When We All Fall Asleep (Billie Eilish)
(10, 19, 2, 1, 'bad guy', 'bad-guy', 194, 'external', NULL, 'https://music.example.com/songs/bad-guy.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 2, 1, 320, 0, '2019-03-29', 1),
(10, 19, 2, 1, 'when the party\'s over', 'when-the-party-s-over', 202, 'external', NULL, 'https://music.example.com/songs/when-party-over.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 3, 1, 320, 0, '2019-03-29', 1),
(10, 19, 2, 1, 'bury a friend', 'bury-a-friend', 194, 'external', NULL, 'https://music.example.com/songs/bury-a-friend.mp3', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 4, 1, 320, 1, '2019-03-29', 1);

-- ============================================================================
-- PLAYLISTS
-- ============================================================================

INSERT INTO playlists (user_id, name, description, cover_image_url, is_public)
VALUES
(2, 'Classic Rock Essentials', 'The best classic rock songs of all time', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1),
(2, 'Jazz Favorites', 'Smooth jazz for relaxation and focus', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 1),
(2, 'Electronic Vibes', 'Electronic and dance music for every mood', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 1),
(3, 'Hip Hop Hits', 'Contemporary and classic hip hop tracks', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1),
(3, 'Chill Pop', 'Relaxing pop songs for unwinding', 'https://images.unsplash.com/photo-1516280440614-37939635b85f?w=400', 0),
(4, 'Workout Mix', 'High energy songs for the gym', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1),
(4, 'Late Night Vibes', 'Perfect songs for late night listening', 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400', 0),
(5, 'Metal Madness', 'Headbanging metal hits', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 1);

-- ============================================================================
-- PLAYLIST SONGS
-- ============================================================================

-- Classic Rock Essentials (playlist 1)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(1, 1, 1, 2), -- Come Together
(1, 2, 2, 2), -- Something
(1, 5, 3, 2); -- Octopus's Garden

-- Jazz Favorites (playlist 2)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(2, 12, 1, 2), -- So What
(2, 13, 2, 2), -- Freddie Freeloader
(2, 14, 3, 2); -- Blue in Green

-- Electronic Vibes (playlist 3)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(3, 21, 1, 2), -- One More Time
(3, 22, 2, 2), -- Digital Love
(3, 23, 3, 2); -- Harder, Better, Faster, Stronger

-- Hip Hop Hits (playlist 4)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(4, 18, 1, 3), -- Bitch, Don't Kill My Vibe
(4, 19, 2, 3), -- The Art of Peer Pressure
(4, 20, 3, 3); -- Money Trees

-- Chill Pop (playlist 5)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(5, 15, 1, 3), -- Hello
(5, 16, 2, 3), -- I Miss You
(5, 17, 3, 3); -- When We Were Young

-- Workout Mix (playlist 6)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(6, 3, 1, 4), -- Maxwell's Silver Hammer
(6, 23, 2, 4), -- Harder, Better, Faster, Stronger
(6, 10, 3, 4); -- Moonage Daydream

-- Late Night Vibes (playlist 7)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(7, 14, 1, 4), -- Blue in Green
(7, 17, 2, 4), -- When We Were Young
(7, 2, 3, 4); -- Something

-- Metal Madness (playlist 8)
INSERT INTO playlist_songs (playlist_id, song_id, position, added_by_user_id)
VALUES
(8, 29, 1, 5), -- Master of Puppets
(8, 30, 2, 5), -- The Thing That Should Not Be
(8, 31, 3, 5); -- Welcome Home (Sanitarium)

-- ============================================================================
-- FAVORITES
-- ============================================================================

INSERT INTO favorites (user_id, song_id)
VALUES
(2, 1), -- John's favorites
(2, 12),
(2, 21),
(3, 18), -- Mike's favorites
(3, 19),
(3, 20),
(4, 15), -- Sarah's favorites
(4, 27),
(4, 34),
(5, 29), -- Admin's favorites
(5, 30),
(5, 31);

-- ============================================================================
-- SONG VIEWS
-- ============================================================================

INSERT INTO song_views (song_id, user_id, viewed_at, source)
VALUES
(1, 2, NOW() - INTERVAL 2 DAY, 'library'),
(1, 3, NOW() - INTERVAL 1 DAY, 'library'),
(2, 2, NOW() - INTERVAL 3 HOUR, 'playlist'),
(12, 2, NOW() - INTERVAL 1 HOUR, 'library'),
(21, 3, NOW() - INTERVAL 2 HOUR, 'library'),
(18, 3, NOW(), 'library'),
(27, 4, NOW() - INTERVAL 30 MINUTE, 'library'),
(29, 5, NOW() - INTERVAL 4 HOUR, 'library');

-- ============================================================================
-- RECENTLY PLAYED
-- ============================================================================

INSERT INTO recently_played (user_id, song_id, played_at, play_source, context_ref)
VALUES
(2, 1, NOW() - INTERVAL 5 MINUTE, 'library', NULL),
(2, 12, NOW() - INTERVAL 10 MINUTE, 'library', NULL),
(2, 21, NOW() - INTERVAL 15 MINUTE, 'playlist', '1'),
(3, 18, NOW() - INTERVAL 2 MINUTE, 'library', NULL),
(3, 19, NOW() - INTERVAL 7 MINUTE, 'library', NULL),
(4, 15, NOW() - INTERVAL 20 MINUTE, 'library', NULL),
(4, 27, NOW() - INTERVAL 25 MINUTE, 'playlist', '2'),
(5, 29, NOW() - INTERVAL 1 MINUTE, 'library', NULL);

-- ============================================================================
-- SONG LIKES
-- ============================================================================

INSERT INTO song_likes (user_id, song_id)
VALUES
(2, 1),
(2, 12),
(2, 21),
(3, 18),
(3, 19),
(3, 20),
(4, 15),
(4, 27),
(4, 34),
(5, 29),
(5, 30),
(5, 31);

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
SELECT 'Sample data inserted successfully!' AS message;
SELECT COUNT(*) AS user_count FROM users;
SELECT COUNT(*) AS artist_count FROM artists;
SELECT COUNT(*) AS album_count FROM albums;
SELECT COUNT(*) AS song_count FROM songs;
SELECT COUNT(*) AS genre_count FROM genres;
SELECT COUNT(*) AS playlist_count FROM playlists;
