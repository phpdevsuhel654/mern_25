# Phase 12

## Objective

Prepare production-ready deployment artifacts for the full stack (database, backend API, user frontend, admin panel).

## Architecture Decisions

1. Dockerized each application for environment consistency.
2. Used multi-stage builds for frontend/admin to produce static assets and serve via Nginx.
3. Used MySQL official image with persistent volume and migration bootstrap mount.
4. Added service healthchecks and startup dependency ordering via Docker Compose.

## Deployment Artifacts Added

1. Root compose stack: `docker-compose.yml`
2. Backend container image definition: `backend/Dockerfile`
3. Frontend container image definition: `frontend/Dockerfile`
4. Admin panel container image definition: `admin-panel/Dockerfile`
5. Container build context exclusions: `.dockerignore`
6. Deployment environment template: `deploy.env.example`

## Services in Compose

1. `db` (MySQL 8.4)
2. `backend` (Node.js API)
3. `frontend` (Nginx static React UI on port 8080)
4. `admin-panel` (Nginx static React admin UI on port 8081)

## Runtime Ports

1. API: `4000`
2. Frontend: `8080`
3. Admin Panel: `8081`
4. MySQL: `3306`

## Deploy Commands

```bash
# from 17-music-player root

docker compose up -d --build

docker compose ps
```

Logs and teardown:

```bash
docker compose logs -f backend
docker compose down
```

## Post-Deploy Verification

1. API health: `http://localhost:4000/api/v1/health`
2. Frontend: `http://localhost:8080`
3. Admin panel: `http://localhost:8081`

## Status

Phase 12 completed.
Core phase implementation is complete.
