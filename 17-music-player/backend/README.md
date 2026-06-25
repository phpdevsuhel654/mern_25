# Backend

## Setup

1. Copy .env.example to .env
2. Ensure MySQL is running and Phase 2 migration has been applied
3. Install dependencies: npm install
4. Run development server: npm run dev

## Available Scripts

- npm run dev
- npm run start

## Auth Endpoints

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET /api/v1/auth/me
- GET /api/v1/auth/admin/check

## Song Endpoints

- GET /api/v1/songs
- GET /api/v1/songs/:id
- POST /api/v1/songs (admin)
- PATCH /api/v1/songs/:id (admin)
- PATCH /api/v1/songs/:id/status (admin)
- DELETE /api/v1/songs/:id (admin)

## Playlist Endpoints

- GET /api/v1/playlists/public
- GET /api/v1/playlists/mine/list (auth)
- GET /api/v1/playlists/:id
- POST /api/v1/playlists (auth)
- PATCH /api/v1/playlists/:id (auth)
- DELETE /api/v1/playlists/:id (auth)
- POST /api/v1/playlists/:id/songs (auth)
- DELETE /api/v1/playlists/:id/songs/:songId (auth)
- PATCH /api/v1/playlists/:id/songs/reorder (auth)

## Streaming Endpoints

- GET /api/v1/stream/state (auth)
- GET /api/v1/stream/songs/:songId/source (auth)
- GET /api/v1/stream/files/:songId (auth)
- POST /api/v1/stream/play (auth)
- POST /api/v1/stream/pause (auth)
- POST /api/v1/stream/resume (auth)
- POST /api/v1/stream/next (auth)
- POST /api/v1/stream/previous (auth)
- PATCH /api/v1/stream/volume (auth)
- PATCH /api/v1/stream/mode (auth)
- POST /api/v1/stream/queue (auth)
- DELETE /api/v1/stream/queue/:songId (auth)
- DELETE /api/v1/stream/queue (auth)
- PATCH /api/v1/stream/queue/reorder (auth)
