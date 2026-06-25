# Architecture

## High-Level Design

The application follows a frontend-backend architecture with clear separation of concerns.

- Frontend: user input, live UI updates, API communication
- Backend: validation, conversion logic, standardized response handling

## Backend Layering

Request flow:

1. Route
2. Validation middleware
3. Controller
4. Service
5. Utility/constants
6. Response formatter

### Backend Folders

- src/routes: endpoint declarations
- src/middleware: validation, not found, centralized error handler
- src/controllers: request/response orchestration
- src/services: conversion business logic
- src/utils: conversion constants, AppError, response formatter
- src/config: environment configuration

## Frontend Layering

UI flow:

1. Page component
2. Form and result components
3. Custom hook (state + effect + debounce)
4. Service function
5. Axios HTTP client
6. Backend API

### Frontend Folders

- src/pages: top-level page container
- src/components: reusable UI parts (form/result)
- src/hooks: conversion state and side effects
- src/services: API operation wrappers
- src/api: Axios instance configuration
- src/utils: category/unit options
- src/styles: app styling

## Core Design Decisions

- Stateless backend: no database dependency
- Server-side input validation before business logic
- Case-insensitive units/categories via normalization
- Rounded numeric output for stable display
- Debounced frontend requests to limit API traffic

## Conversion Strategy

### Length and Weight

Use base units to convert in two steps:

1. Convert input to base unit (meter or kilogram)
2. Convert base unit to target unit

### Temperature

Use Celsius as intermediate format:

1. Convert source to Celsius
2. Convert Celsius to target unit
