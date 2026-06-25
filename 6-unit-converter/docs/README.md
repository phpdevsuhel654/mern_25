# Unit Converter Documentation

This folder contains technical and usage documentation for the Unit Converter application.

## Documentation Index

- [Getting Started](./getting-started.md)
- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Testing Guide](./testing.md)
- [Deployment Guide](./deployment.md)

## Application Summary

The Unit Converter app provides real-time conversion for:

- Length
- Weight
- Temperature

It is built with:

- Frontend: React + Vite + Axios
- Backend: Node.js + Express
- Data Store: None (stateless API)

## Main Features

- Live conversion on input change
- Case-insensitive request normalization on backend
- Validation with structured API error responses
- Unit swap support in UI
- Layered architecture for maintainability
- Automated backend tests with Jest and Supertest
