# Deployment Guide

## Backend Deployment

## Build/Run

```bash
cd backend
npm run start
```

The backend starts the Express server from src/server.js.

## Required Environment Variables

```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
```

Recommendations:

- Set NODE_ENV=production for production-safe error payloads.
- Restrict CORS_ORIGIN to known frontend origins.
- Run process with a process manager (PM2, systemd, container runtime).

## Frontend Deployment

## Build

```bash
cd frontend
npm run build
```

Build output is generated in frontend/dist.

## Preview Locally

```bash
cd frontend
npm run preview
```

## Production Environment Variable

Set API base URL before building frontend:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Common Deployment Checklist

1. Backend responds on /api/health.
2. CORS is configured for deployed frontend URL.
3. Frontend points to deployed backend URL.
4. HTTPS is enabled in production.
5. Backend test suite passes before release.
