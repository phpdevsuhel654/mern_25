# Phase 5

## Objective

Implement Song Management module for backend with CRUD APIs, search/filter/sort listing, and admin-protected write operations.

## Architecture Decisions

1. Followed Controller-Service-Repository pattern for songs.
2. Kept list endpoint public for browsing; write/update/delete endpoints are admin-only via RBAC middleware.
3. Added validation layer for route params, query filters, and payload schema.
4. Enforced reference integrity in service layer for artist/album/genre existence.
5. Normalized local vs external source payload behavior in service layer.

## Folder Structure Changes

```text
17-music-player/
└── backend/
    └── src/
        ├── controllers/
        │   └── song.controller.js
        ├── repositories/
        │   └── song.repository.js
        ├── routes/
        │   ├── song.routes.js
        │   └── index.js
        ├── services/
        │   └── song.service.js
        ├── utils/
        │   └── slugify.js
        └── validations/
            └── song.validation.js
```

## APIs Added

Base prefix: /api/v1

1. GET /songs
2. GET /songs/:id
3. POST /songs (admin)
4. PATCH /songs/:id (admin)
5. PATCH /songs/:id/status (admin)
6. DELETE /songs/:id (admin, soft archive via is_active=0)

## Query Filters (GET /songs)

- search
- artistId
- albumId
- genreId
- sourceType (local|external)
- isActive
- page
- limit
- sortBy (createdAt|title|releaseDate|durationSeconds)
- sortOrder (asc|desc)

## Request Payloads

### Create Song (POST /songs)

```json
{
  "artistId": 1,
  "albumId": 1,
  "genreId": 1,
  "title": "Night Pulse",
  "durationSeconds": 242,
  "sourceType": "local",
  "filePath": "uploads/songs/night-pulse.mp3",
  "coverImageUrl": "https://cdn.example.com/covers/night-pulse.jpg",
  "trackNumber": 3,
  "discNumber": 1,
  "playbackBitrateKbps": 320,
  "isExplicit": false,
  "releaseDate": "2026-06-01",
  "isActive": true
}
```

### Status Update (PATCH /songs/:id/status)

```json
{
  "isActive": false
}
```

## Response Structure

Success:

```json
{
  "success": true,
  "data": {
    "song": {
      "id": 1,
      "title": "Night Pulse",
      "slug": "night-pulse"
    }
  }
}
```

Validation error:

```json
{
  "success": false,
  "message": "Validation failed",
  "requestId": "<uuid>",
  "details": {
    "errors": [
      {
        "type": "field",
        "msg": "artistId is required",
        "path": "artistId",
        "location": "body"
      }
    ]
  }
}
```

## Code Explanation

1. song.repository.js: all DB access for songs, search, pagination, and related entity existence checks.
2. song.service.js: business rules (slug generation, source payload constraints, reference checks, mapping output format).
3. song.controller.js: transport orchestration and consistent API responses.
4. song.validation.js: strict validation for params/query/body.
5. song.routes.js: public read routes + admin protected write routes.

## Commands To Run

```bash
cd backend
npm run dev
```

## Testing Instructions

1. Login as admin and capture JWT token.
2. Create song via POST /api/v1/songs with Authorization Bearer token.
3. List songs with filters, e.g. GET /api/v1/songs?search=night&page=1&limit=20.
4. Update status via PATCH /api/v1/songs/:id/status.
5. Delete (archive) via DELETE /api/v1/songs/:id.
6. Validate non-admin token receives 403 on write endpoints.

## Status

Phase 5 completed.
Waiting for approval to start Phase 6 Playlist Module.
