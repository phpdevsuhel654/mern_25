# Phase 4

## Objective

Implement the authentication module with secure registration, login, logout, JWT-based route protection, and role-based authorization controls.

## Architecture Decisions

1. Implemented auth in Controller-Service-Repository pattern for separation of transport, business, and data access layers.
2. Used bcrypt hashing for password security and JWT access tokens for stateless authentication.
3. Added request-level validation using express-validator and centralized validation error middleware.
4. Added authentication and authorization middleware for protected and RBAC routes.
5. Used parameterized MySQL queries via mysql2 to mitigate SQL injection risk.

## Folder Structure Changes

```text
17-music-player/
└── backend/
    ├── .env.example
    ├── package.json
    └── src/
        ├── config/
        │   └── db.js
        ├── constants/
        │   └── roles.js
        ├── controllers/
        │   └── auth.controller.js
        ├── helpers/
        │   └── jwt.js
        ├── middleware/
        │   ├── authenticate.js
        │   ├── authorize.js
        │   └── validateRequest.js
        ├── repositories/
        │   └── auth.repository.js
        ├── routes/
        │   ├── auth.routes.js
        │   └── index.js
        ├── services/
        │   └── auth.service.js
        ├── utils/
        │   └── sanitizeUser.js
        └── config/
            └── env.js
```

## API Endpoints Added

Base prefix: /api/v1

1. POST /auth/register
2. POST /auth/login
3. POST /auth/logout (protected)
4. GET /auth/me (protected)
5. GET /auth/admin/check (protected + admin role)

## Request Payloads

### Register

```json
{
  "fullName": "Alex Johnson",
  "username": "alex.j",
  "email": "alex@example.com",
  "password": "Strong#Pass123"
}
```

### Login

```json
{
  "identifier": "alex@example.com",
  "password": "Strong#Pass123"
}
```

## Response Structures

### Success

```json
{
  "success": true,
  "data": {
    "token": "<jwt>",
    "user": {
      "id": 1,
      "role": "user",
      "fullName": "Alex Johnson",
      "username": "alex.j",
      "email": "alex@example.com"
    }
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "requestId": "<uuid>",
  "details": {
    "errors": [
      {
        "type": "field",
        "msg": "email must be valid",
        "path": "email",
        "location": "body"
      }
    ]
  }
}
```

## Validation Rules

Register:

- fullName: 2 to 120 chars
- username: 3 to 60 chars, letters/numbers/underscore/dot/hyphen
- email: valid email format
- password: 8 to 72 chars, includes upper/lower/number/special

Login:

- identifier: required string
- password: required, 8 to 72 chars

## Security Implemented In Phase 4

- Password hashing with bcryptjs
- JWT signing and verification
- Protected routes with bearer token middleware
- Role-based access middleware
- SQL injection mitigation via parameterized queries
- Existing Phase 3 middleware retained: helmet, cors, hpp, rate limiting

## Commands To Run

```bash
cd backend
npm install
npm run dev
```

## Testing Instructions

1. Ensure MySQL is running and schema from Phase 2 is applied.
2. Configure backend .env from .env.example.
3. Register a user with POST /api/v1/auth/register.
4. Login with POST /api/v1/auth/login and store returned token.
5. Call GET /api/v1/auth/me with Authorization: Bearer <token>.
6. Verify GET /api/v1/auth/admin/check returns 403 for non-admin users.

## Status

Phase 4 completed.
Waiting for approval to start Phase 5 Song Management Module.
