# Phase 6

## Objective

Implement Playlist Module APIs for user-created playlists including create, update, delete, fetch, list, and playlist-song operations.

## Architecture Decisions

1. Kept Controller-Service-Repository layering consistent with prior modules.
2. Applied ownership checks with admin override for protected playlist modifications.
3. Exposed public playlist browsing endpoint while keeping private playlists protected.
4. Implemented playlist-song position management to keep ordered playback behavior deterministic.
5. Added reorder API to support drag-and-drop or queue-style ordering from clients.

## Folder Structure Changes

```text
17-music-player/
└── backend/
    └── src/
        ├── controllers/
        │   └── playlist.controller.js
        ├── repositories/
        │   └── playlist.repository.js
        ├── routes/
        │   ├── index.js
        │   └── playlist.routes.js
        ├── services/
        │   └── playlist.service.js
        └── validations/
            └── playlist.validation.js
```

## APIs Added

Base prefix: /api/v1

1. GET /playlists/public
2. GET /playlists/mine/list (auth)
3. GET /playlists/:id
4. POST /playlists (auth)
5. PATCH /playlists/:id (auth, owner/admin)
6. DELETE /playlists/:id (auth, owner/admin)
7. POST /playlists/:id/songs (auth, owner/admin)
8. DELETE /playlists/:id/songs/:songId (auth, owner/admin)
9. PATCH /playlists/:id/songs/reorder (auth, owner/admin)

## Request Payloads

### Create Playlist

```json
{
  "name": "Evening Drive",
  "description": "Synthwave and chill",
  "coverImageUrl": "https://cdn.example.com/playlists/evening-drive.jpg",
  "isPublic": true
}
```

### Add Song to Playlist

```json
{
  "songId": 12,
  "position": 2
}
```

### Reorder Songs

```json
{
  "orderedSongIds": [12, 45, 7, 31]
}
```

## Response Structure

Success:

```json
{
  "success": true,
  "data": {
    "playlist": {
      "id": 1,
      "name": "Evening Drive",
      "isPublic": true
    }
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Forbidden to modify this playlist",
  "requestId": "<uuid>"
}
```

## Validation Rules

- Playlist id and song id must be positive integers.
- Playlist name required with max length 160.
- Description max length 500.
- coverImageUrl must be valid URL if provided.
- orderedSongIds must be non-empty array of positive integers.

## Code Explanation

1. playlist.repository.js handles SQL for playlist CRUD and playlist_songs ordering operations.
2. playlist.service.js enforces business rules for ownership, visibility, and song ordering integrity.
3. playlist.controller.js maps HTTP flow and standard API responses.
4. playlist.validation.js validates path params, query filters, and payloads.
5. playlist.routes.js exposes public read routes and authenticated mutation routes.

## Commands To Run

```bash
cd backend
npm run dev
```

## Testing Instructions

1. Login and get JWT token.
2. Create playlist with POST /api/v1/playlists.
3. Add songs with POST /api/v1/playlists/:id/songs.
4. Reorder songs with PATCH /api/v1/playlists/:id/songs/reorder.
5. Remove song with DELETE /api/v1/playlists/:id/songs/:songId.
6. Verify GET /api/v1/playlists/public returns only public playlists.

## Status

Phase 6 completed.
Waiting for approval to start Phase 7 Music Streaming Module.
