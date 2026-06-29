# Database Migrations & Seeds

Phase 2 provides the initial normalized MySQL schema and sample data for development.

## Files

### Migrations
- `migrations/001_create_core_schema.sql` - Creates all tables and initial roles
- `migrations/001_drop_core_schema.sql` - Drops all tables (rollback)

### Seeds
- `seeds/001_sample_data.sql` - Sample data for all tables

## Setup Instructions

### 1. Create Database Schema

Run the migration to create all tables:

```sql
SOURCE backend/database/migrations/001_create_core_schema.sql;
```

Or using MySQL CLI:
```bash
mysql -h 127.0.0.1 -u root -p music_player < backend/database/migrations/001_create_core_schema.sql
```

### 2. Seed Sample Data

Option A: Using Node.js script (recommended):
```bash
npm run seed
```

Option B: Using MySQL directly:
```sql
SOURCE backend/database/seeds/001_sample_data.sql;
```

Or using MySQL CLI:
```bash
mysql -h 127.0.0.1 -u root -p music_player < backend/database/seeds/001_sample_data.sql
```

## Sample Data Overview

The seed file (`001_sample_data.sql`) includes:

- **Users**: 5 users (1 admin + 4 regular users)
  - Admin: `admin@example.com` / `Sohail@123`
  - Regular users with different roles and profiles

- **Genres**: 10 genres (Rock, Pop, Hip Hop, Electronic, Jazz, R&B, Country, Classical, Metal, Indie)

- **Artists**: 10 famous artists (Beatles, Bowie, Miles Davis, Adele, Kendrick Lamar, Daft Punk, Taylor Swift, John Coltrane, Metallica, Billie Eilish)

- **Albums**: 20 albums from various artists with metadata

- **Songs**: 39 songs across all albums with full metadata

- **Playlists**: 8 playlists created by users
  - Classic Rock Essentials (public)
  - Jazz Favorites (public)
  - Electronic Vibes (public)
  - Hip Hop Hits (public)
  - Chill Pop (private)
  - Workout Mix (public)
  - Late Night Vibes (private)
  - Metal Madness (public)

- **Relationships**: Playlist songs, favorites, song views, recently played, and song likes

## Rollback

To remove all data and tables:

```sql
SOURCE backend/database/migrations/001_drop_core_schema.sql;
```

## Notes

- Target engine: MySQL 8.0+
- Charset/Collation: utf8mb4 / utf8mb4_unicode_ci
- Includes FK constraints, unique keys, composite indexes, and CHECK constraints
- All passwords in seed data are hashed with bcrypt (plaintext: `Sohail@123`)
- All external URLs point to placeholder/CDN images for development

## Database Schema

### Core Tables
- `roles` - User roles (admin, user)
- `users` - User accounts
- `artists` - Music artists
- `genres` - Music genres
- `albums` - Albums by artists
- `songs` - Individual songs with metadata

### Association Tables
- `playlists` - User-created playlists
- `playlist_songs` - Songs in playlists
- `favorites` - User's favorite songs
- `song_likes` - User's liked songs

### Analytics Tables
- `song_views` - Song view tracking
- `recently_played` - Recently played songs by users
- `streaming_state` - Streaming session state (from 002_create_streaming_state.sql)

