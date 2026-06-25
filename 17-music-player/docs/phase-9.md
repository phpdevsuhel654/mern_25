# Phase 9

## Objective

Build the Admin Panel application with secure admin login, protected routing, dashboard visibility, and operational song management workflows.

## Architecture Decisions

1. Implemented standalone React app under admin-panel with dedicated router, context, and services.
2. Enforced admin-only access using token validation plus /auth/admin/check verification.
3. Used reusable admin shell (sidebar + header + routed content area).
4. Implemented real Song Management against backend admin-protected song APIs.
5. Added feature pages for artists, albums, genres, playlists, users, uploads, and stats as route-ready modules tied to current backend capability.

## Folder Structure Changes

```text
17-music-player/
└── admin-panel/
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── README.md
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api/
        │   └── httpClient.js
        ├── assets/
        │   └── admin.css
        ├── components/
        │   ├── AdminSidebar.jsx
        │   └── ProtectedAdminRoute.jsx
        ├── constants/
        │   └── adminRoutes.js
        ├── context/
        │   └── AdminAuthContext.jsx
        ├── layouts/
        │   └── AdminLayout.jsx
        ├── pages/
        │   ├── AdminLoginPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── SongManagementPage.jsx
        │   └── GenericManagementPage.jsx
        ├── routes/
        │   └── AdminRouter.jsx
        └── services/
            ├── authService.js
            ├── playlistService.js
            └── songService.js
```

## Admin Features Implemented (Phase 9)

1. Admin Login
2. Dashboard
3. Song Management (create, activate/deactivate, archive)
4. Artist Management page scaffold
5. Album Management page scaffold
6. Genre Management page scaffold
7. Playlist Monitoring page scaffold
8. User Management page scaffold
9. Upload Music/Cover page scaffold
10. System Statistics page scaffold

## API Integration

- POST /auth/login
- GET /auth/me
- GET /auth/admin/check
- GET /songs
- POST /songs
- PATCH /songs/:id/status
- DELETE /songs/:id
- GET /playlists/public

## Commands To Run

```bash
cd admin-panel
npm install
npm run dev
```

Production validation:

```bash
npm run build
```

## Testing Instructions

1. Use an admin account to sign in at /login.
2. Verify redirection to dashboard and admin sidebar navigation.
3. In Songs page, create a new song and confirm it appears in list.
4. Toggle song status and archive action.
5. Open each management route and verify page rendering.

## Status

Phase 9 completed.
Waiting for approval to start Phase 10 Testing.
