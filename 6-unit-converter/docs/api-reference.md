# API Reference

## Base URL

- Development: http://localhost:5000

## Response Format

### Success

```json
{
  "success": true,
  "result": 1
}
```

### Error

```json
{
  "success": false,
  "message": "Invalid toUnit for selected category",
  "path": "/api/converter/convert",
  "timestamp": "2026-06-25T12:00:00.000Z"
}
```

Notes:

- path and timestamp are included when NODE_ENV is not production.

## Endpoints

## 1) Health Check

- Method: GET
- Route: /api/health

### Example Response

```json
{
  "success": true,
  "message": "Backend is running"
}
```

## 2) Convert Unit

- Method: POST
- Route: /api/converter/convert

### Request Body

```json
{
  "category": "length",
  "fromUnit": "meter",
  "toUnit": "kilometer",
  "value": 1000
}
```

### Field Rules

- category: required, one of length | weight | temperature
- fromUnit: required, valid unit for selected category
- toUnit: required, valid unit for selected category
- value: required, must be a finite number

### Input Normalization

The backend normalizes category and unit values to lowercase and trims whitespace.

Example accepted input:

```json
{
  "category": "Length",
  "fromUnit": "Meter",
  "toUnit": "Kilometer",
  "value": "1000"
}
```

### Example Success Response

```json
{
  "success": true,
  "result": 1
}
```

## Error Cases

### 400 Bad Request

- Missing required fields
- Invalid category
- Invalid fromUnit for selected category
- Invalid toUnit for selected category
- value is not a valid number

### 404 Not Found

- Unknown route

### 500 Internal Server Error

- Unexpected server error
