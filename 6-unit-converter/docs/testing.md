# Testing Guide

Backend tests use Jest and Supertest.

## Run Tests

```bash
cd backend
npm test
```

## Watch Mode

```bash
cd backend
npm run test:watch
```

## Current Coverage Scope

### Service Tests

- Unit conversion correctness for:
  - Weight (example: kilogram to gram)
  - Temperature (example: celsius to fahrenheit)

### API Tests

- Successful conversion response
- Input normalization (case-insensitive category/unit and numeric string value)
- Validation failure for invalid unit
- 404 behavior for unknown route

## Suggested Additional Tests

- More edge cases for temperature extremes
- Decimal precision cases
- Additional invalid payload combinations
- CORS behavior under specific origins
