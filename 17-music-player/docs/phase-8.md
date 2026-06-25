# Phase 8

## Objective

Build the Frontend User Application with authentication, library browsing, playlist screens, and playback controls integrated with backend APIs from Phases 4-7.

## Architecture Decisions

1. Used React + React Router with protected route pattern for authenticated pages.
2. Implemented API abstraction layer with Axios and centralized auth token injection.
3. Used Context API for auth state and playback state orchestration.
4. Added reusable layout and UI components for scalable page development.
5. Kept responsive, intentional UI with a fixed player dock for playback actions.

## Folder Structure Changes

```text
17-music-player/
└── frontend/
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
        │   └── app.css
        ├── components/
        │   ├── AppHeader.jsx
        │   ├── PlayerDock.jsx
        │   ├── ProtectedRoute.jsx
        │   └── SongTable.jsx
        ├── constants/
        │   └── appRoutes.js
        ├── context/
        │   ├── AuthContext.jsx
        │   └── PlayerContext.jsx
        ├── hooks/
        │   └── useDebouncedValue.js
        ├── layouts/
        │   └── UserLayout.jsx
        ├── pages/
        │   ├── LibraryPage.jsx
        │   ├── LoginPage.jsx
        │   ├── NotFoundPage.jsx
        │   ├── PlaylistDetailPage.jsx
        │   ├── PlaylistsPage.jsx
        │   ├── ProfilePage.jsx
        │   └── RegisterPage.jsx
        ├── routes/
        │   └── AppRouter.jsx
        └── services/
            ├── authService.js
            ├── playlistService.js
            ├── songService.js
            └── streamingService.js
```

## Frontend Features Implemented

1. Registration and login screens
2. Protected authenticated routing
3. Library page with search and song listing
4. Song play + queue add actions
5. Playlist listing and create flow
6. Playlist detail page with track actions
7. Profile page rendering authenticated user data
8. Global player dock with play/pause/resume/next/previous/volume/shuffle controls

## API Integration Coverage

- Auth APIs: register, login, me
- Song APIs: list songs
- Playlist APIs: mine list, public list, create, detail
- Streaming APIs: state, play, pause, resume, next, previous, mode, volume, queue actions

## Commands To Run

```bash
cd frontend
npm install
npm run dev
```

Production validation:

```bash
npm run build
```

## Testing Instructions

1. Start backend server and ensure DB migrations are applied.
2. Start frontend dev server.
3. Register/login and verify redirect to library.
4. Search songs in library and start playback.
5. Add songs to queue and use player dock controls.
6. Create a playlist and open playlist details.

## Status

Phase 8 completed.
Waiting for approval to start Phase 9 Admin Panel.
