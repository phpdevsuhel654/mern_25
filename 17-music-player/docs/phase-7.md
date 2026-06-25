# Phase 7

## Objective

Implement Music Streaming Module with playback state, queue management, stream source resolution, and local/external playback support.

## Architecture Decisions

1. Added persistent playback state per user in database instead of in-memory state.
2. Added persistent playback queue with stable ordering for next/previous playback.
3. Unified stream source resolution for local and external songs.
4. Logged playback events into recently_played and song_views for analytics and user history.
5. Used authenticated streaming routes to protect playback state and queue actions.

## Folder Structure Changes

```text
17-music-player/
└── backend/
    ├── database/
    │   └── migrations/
    │       ├── 002_create_streaming_state.sql
    │       └── 002_drop_streaming_state.sql
    └── src/
        ├── controllers/
        │   └── streaming.controller.js
        ├── repositories/
        │   └── streaming.repository.js
        ├── routes/
        │   ├── index.js
        │   └── streaming.routes.js
        ├── services/
        │   └── streaming.service.js
        └── validations/
            └── streaming.validation.js
```

## APIs Added

Base prefix: /api/v1/stream

1. GET /state
2. GET /songs/:songId/source
3. GET /files/:songId
4. POST /play
5. POST /pause
6. POST /resume
7. POST /next
8. POST /previous
9. PATCH /volume
10. PATCH /mode
11. POST /queue
12. DELETE /queue/:songId
13. DELETE /queue
14. PATCH /queue/reorder

## Request Payloads

### Play

```json
{
  "songId": 10,
  "positionSeconds": 0,
  "playSource": "library",
  "contextRef": "search-result"
}
```

### Update Volume

```json
{
  "volumePercent": 65
}
```

### Update Mode

```json
{
  "shuffleEnabled": true,
  "repeatMode": "all"
}
```

### Add Queue Item

```json
{
  "songId": 10,
  "position": 1,
  "sourceType": "manual",
  "sourceRef": "quick-add"
}
```

### Reorder Queue

```json
{
  "orderedSongIds": [10, 22, 31, 44]
}
```

## Response Structure

```json
{
  "success": true,
  "data": {
    "status": "playing"
  }
}
```

## Validation Rules

- songId and queue ids must be positive integers.
- volumePercent must be 0 to 100.
- repeatMode must be off, one, or all.
- orderedSongIds must include unique positive integers.

## Code Explanation

1. streaming.repository.js handles playback session state, queue CRUD, queue reorder transaction, and playback logs.
2. streaming.service.js implements playback actions, source resolution, next/previous behavior, and local media path safety.
3. streaming.controller.js maps HTTP handlers and sends standardized API responses.
4. streaming.validation.js validates all streaming payloads and params.
5. 002 migrations add playback_sessions and playback_queue tables.

## Commands To Run

```bash
cd backend
# apply migration 002 in MySQL
npm run dev
```

## Testing Instructions

1. Apply migration 002_create_streaming_state.sql.
2. Authenticate and get bearer token.
3. Add queue songs with POST /api/v1/stream/queue.
4. Start playback with POST /api/v1/stream/play.
5. Move tracks using POST /api/v1/stream/next and POST /api/v1/stream/previous.
6. Resolve source via GET /api/v1/stream/songs/:songId/source.
7. For local songs, call GET /api/v1/stream/files/:songId and verify media file response.

## Status

Phase 7 completed.
Waiting for approval to start Phase 8 Frontend User Application.
