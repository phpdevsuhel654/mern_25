# Phase 3

## Objective

Set up a production-ready backend foundation for the music player with environment configuration, secure middleware stack, standardized responses, base routing, and centralized error handling.

## Architecture Decisions

1. Bootstrapped backend around layered architecture directories already created in Phase 1.
2. Added a versioned API prefix via environment config for forward-compatible API evolution.
3. Added security and hardening middleware early: helmet, cors, hpp, rate limiting, compression.
4. Added request tracing and structured logging with requestId to simplify debugging and observability.
5. Kept business modules (auth, songs, playlists) out of this phase to respect phase boundaries.

## Folder Structure Changes

```text
17-music-player/
└── backend/
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── README.md
    └── src/
        ├── app.js
        ├── server.js
        ├── config/
        │   ├── env.js
        │   └── logger.js
        ├── constants/
        │   └── httpStatus.js
        ├── controllers/
        │   └── health.controller.js
        ├── middleware/
        │   ├── errorHandler.js
        │   ├── notFound.js
        │   ├── requestId.js
        │   └── requestLogger.js
        ├── routes/
        │   ├── health.routes.js
        │   └── index.js
        └── utils/
            ├── apiResponse.js
            ├── AppError.js
            └── asyncHandler.js
```

## Code Generated

- Runtime and scripts: backend/package.json
- Env template: backend/.env.example
- App bootstrap: backend/src/app.js
- Server bootstrap: backend/src/server.js
- Config: backend/src/config/env.js, backend/src/config/logger.js
- Middleware: requestId, requestLogger, notFound, errorHandler
- Utility layer: AppError, asyncHandler, apiResponse
- Base route and health endpoint

## Code Explanation

1. app.js wires security middleware, body parsing, versioned routes, and global error pipeline.
2. server.js starts HTTP server and handles graceful shutdown signals.
3. env.js centralizes env parsing with safe numeric defaults.
4. logger.js emits JSON logs for consistent parsing across environments.
5. requestId.js injects x-request-id for traceability.
6. health endpoint provides runtime status for readiness checks.

## Commands To Run

```bash
cd backend
npm install
npm run dev
```

## Testing Instructions

1. Open browser or API client and call:
   - GET http://localhost:4000/api/v1/health
2. Verify response success and service status payload.
3. Verify response headers include x-request-id.

## Status

Phase 3 completed.
Waiting for approval to start Phase 4 Authentication Module.
