# Unit Converter

A production-quality real-time unit conversion application built with React.js and Node.js/Express.

## Features

- **Real-time conversion** across three categories: length, weight, and temperature
- **Responsive design** optimized for desktop and mobile
- **Input normalization** with case-insensitive unit validation
- **Swap units** with a single click for reversed conversions
- **Clear error handling** and validation feedback
- **Automated testing** covering API and service layers
- **Clean layered architecture** following SOLID principles

## Tech Stack

### Frontend
- React 18.3 with Hooks
- Axios for HTTP client
- Vite for build tooling
- Modern CSS with responsive layout

### Backend
- Node.js with Express 4.19
- Jest and Supertest for testing
- Environment-based configuration

### Supported Conversions

**Length:** meter, kilometer, centimeter, millimeter, mile, yard, foot, inch  
**Weight:** kilogram, gram, milligram, pound, ounce  
**Temperature:** celsius, fahrenheit, kelvin

## Project Structure

```
6-unit-converter/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   └── conversionController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   └── validateConversionRequest.js
│   │   ├── routes/
│   │   │   └── conversionRoutes.js
│   │   ├── services/
│   │   │   └── conversionService.js
│   │   ├── tests/
│   │   │   ├── converterApi.test.js
│   │   │   └── conversionService.test.js
│   │   ├── utils/
│   │   │   ├── AppError.js
│   │   │   ├── conversionFactors.js
│   │   │   └── responseFormatter.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── httpClient.js
│   │   ├── components/
│   │   │   ├── ConverterForm.jsx
│   │   │   └── ConversionResult.jsx
│   │   ├── hooks/
│   │   │   └── useConverter.js
│   │   ├── pages/
│   │   │   └── ConverterPage.jsx
│   │   ├── services/
│   │   │   └── converterService.js
│   │   ├── styles/
│   │   │   └── app.css
│   │   ├── utils/
│   │   │   └── unitOptions.js
│   │   ├── App.js
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup Backend

```bash
cd backend
npm install
```

### Setup Frontend

```bash
cd frontend
npm install
```

## Running the Application

### Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173` (or shown in terminal)

### Production Build

**Backend:**
```bash
cd backend
npm run start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Watch Mode (Backend)

```bash
cd backend
npm run test:watch
```

## API Documentation

### Base URL
```
http://localhost:5000
```

### Health Check

**GET** `/api/health`

Response:
```json
{
  "success": true,
  "message": "Backend is running"
}
```

### Convert Unit

**POST** `/api/converter/convert`

Request Body:
```json
{
  "category": "length",
  "fromUnit": "meter",
  "toUnit": "kilometer",
  "value": 1000
}
```

Success Response (200):
```json
{
  "success": true,
  "result": 1
}
```

Error Response (400):
```json
{
  "success": false,
  "message": "Invalid toUnit for selected category",
  "path": "/api/converter/convert",
  "timestamp": "2026-06-23T12:00:00.000Z"
}
```

### Error Handling

- **400 Bad Request:** Missing or invalid request fields
- **404 Not Found:** Route does not exist
- **500 Internal Server Error:** Unexpected server error

All error responses follow the standard format:
```json
{
  "success": false,
  "message": "<error description>"
}
```

## Architecture

### Backend Layers

```
Request
  ↓
Middleware (Validation)
  ↓
Route Handler
  ↓
Controller (Business Logic Orchestration)
  ↓
Service (Conversion Logic)
  ↓
Utility (Helper Functions)
  ↓
Response
```

### Frontend Layers

```
User Interaction
  ↓
Page Component
  ↓
Custom Hook (State & Effects)
  ↓
UI Components (Form, Result)
  ↓
API Service
  ↓
HTTP Client
  ↓
Backend API
```

## Environment Configuration

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Deployment

### Backend Deployment (Node.js)

1. Set production environment variables
2. Build: `npm run start`
3. Use process manager (e.g., PM2): `pm2 start src/server.js --name unit-converter`

### Frontend Deployment (Static)

1. Build: `npm run build`
2. Serve `dist/` folder with any static host (Netlify, Vercel, AWS S3, etc.)
3. Update `VITE_API_BASE_URL` to point to production backend

## Development Guidelines

### Code Organization
- **Routes:** Define endpoints
- **Controllers:** Orchestrate requests and responses
- **Services:** Implement business logic
- **Utils:** Reusable helpers and constants
- **Middleware:** Cross-cutting concerns (validation, error handling)

### Naming Conventions
- Files: kebab-case for utilities, camelCase for modules
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS Classes: kebab-case

### Testing Best Practices
- Write tests alongside feature implementation
- Test happy path and error cases
- Use descriptive test names

## Performance Optimization

- Frontend debounces API calls by 250ms to prevent excessive requests
- Result numbers rounded to 10 decimal places to avoid floating-point precision issues
- Lazy state updates with cleanup in useConverter hook

## Future Enhancements

- Conversion history and favorites
- Unit conversion templates
- Batch conversion support
- Offline mode with service workers
- Additional unit categories

## License

MIT

## Support

For issues or questions, please refer to the API documentation or contact the development team.

