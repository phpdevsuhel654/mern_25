# Role

Act as a Principal Software Architect, Senior Full-Stack Engineer, Solution Architect, Database Architect, DevOps Engineer, and Code Reviewer with 15+ years of experience.

# Project

Create a production-grade Music Player application step by step.

The application is a web-based music player that can play music from:

* Curated music library stored in the system
* External music URLs/sources
* User-created playlists

# Technology Stack

## Frontend

* React.js
* React Router
* Axios
* Context API or Redux Toolkit
* Responsive UI
* Modern component architecture

## Backend

* Node.js
* Express.js
* REST API Architecture
* JWT Authentication
* Role-Based Access Control (RBAC)

## Database

* MySQL

## File Storage

* Local storage initially
* Architecture should support future migration to AWS S3

# Project Root Folder

```text
mern_25/
└── 17-music-player/
```

# Folder Structure

Use exactly this structure:

```text
mern_25/
└── 17-music-player/
    │
    ├── backend/
    │
    ├── frontend/
    │
    └── admin-panel/
```

# Architecture Requirements

Follow enterprise-level scalable architecture.

## Backend Architecture

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── routes/
    ├── middleware/
    ├── validations/
    ├── models/
    ├── helpers/
    ├── utils/
    ├── constants/
    ├── uploads/
    └── app.js
```

Use:

* Controller-Service-Repository Pattern
* Dependency separation
* Environment-based configuration
* Centralized error handling
* Request validation
* Secure authentication
* Logging

# Frontend Architecture

```text
frontend/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── routes/
    ├── services/
    ├── hooks/
    ├── context/
    ├── utils/
    ├── constants/
    └── App.jsx
```

Use:

* Feature-based structure
* Reusable components
* Protected routes
* Lazy loading
* API abstraction layer

# Admin Panel Architecture

```text
admin-panel/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── routes/
    ├── services/
    ├── hooks/
    ├── context/
    ├── utils/
    ├── constants/
    └── App.jsx
```

# User Features

Implement:

1. Registration
2. Login
3. Logout
4. JWT Authentication
5. Profile Management
6. Browse Songs
7. Search Songs
8. Filter Songs
9. Play Song
10. Pause Song
11. Resume Song
12. Next Song
13. Previous Song
14. Volume Control
15. Shuffle
16. Repeat
17. Queue Management
18. Favorite Songs
19. Recently Played
20. Playlist Management
21. External Music URL Playback
22. Responsive Design

# Admin Features

Implement:

1. Admin Login
2. Dashboard
3. Song Management
4. Artist Management
5. Album Management
6. Genre Management
7. Playlist Monitoring
8. User Management
9. Upload Music Files
10. Upload Cover Images
11. System Statistics

# Database Design

Create normalized MySQL schema for:

* users
* roles
* songs
* artists
* albums
* genres
* playlists
* playlist_songs
* favorites
* recently_played
* song_views
* song_likes

Generate:

* ER Diagram
* Relationships
* Indexes
* Constraints
* Migration Scripts

# Security Requirements

Implement:

* JWT Authentication
* Password Hashing (bcrypt)
* Input Validation
* SQL Injection Protection
* XSS Protection
* CORS
* Rate Limiting
* Helmet Security Headers

# API Requirements

Generate:

* REST APIs
* Request Payloads
* Response Structures
* Error Responses
* Validation Rules

# Development Approach

IMPORTANT:

Build the project incrementally.

For every phase:

1. Explain the objective.
2. Explain architecture decisions.
3. Generate folder structure.
4. Generate code.
5. Explain code.
6. Wait for my approval before proceeding.

# Development Phases

Phase 1:

* Requirements Analysis
* Architecture Design
* Folder Structure

Phase 2:

* MySQL Database Design

Phase 3:

* Backend Setup

Phase 4:

* Authentication Module

Phase 5:

* Song Management Module

Phase 6:

* Playlist Module

Phase 7:

* Music Streaming Module

Phase 8:

* Frontend User Application

Phase 9:

* Admin Panel

Phase 10:

* Testing

Phase 11:

* Optimization

Phase 12:

* Deployment

# Output Rules

* Generate only one phase at a time.
* Do not skip phases.
* Do not generate future phases.
* Use best practices.
* Use clean code principles.
* Use SOLID principles.
* Use enterprise-grade architecture.
* Keep explanations concise.
* Minimize unnecessary text and token usage.
* Start with Phase 1 only.
