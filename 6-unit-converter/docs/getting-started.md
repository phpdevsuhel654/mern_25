# Getting Started

## Prerequisites

- Node.js 16 or newer
- npm

## Install Dependencies

### 1) Backend

```bash
cd backend
npm install
```

### 2) Frontend

```bash
cd frontend
npm install
```

## Environment Variables

### Backend: backend/.env

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
```

### Frontend: frontend/.env

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run in Development

Open two terminals.

### Terminal A: start backend

```bash
cd backend
npm run dev
```

Backend default URL:

- http://localhost:5000

### Terminal B: start frontend

```bash
cd frontend
npm run dev
```

Frontend default URL:

- http://localhost:5173

## How to Use

1. Select category (length, weight, or temperature).
2. Select from-unit and to-unit.
3. Enter numeric value.
4. View live conversion result.
5. Use Swap to reverse units instantly.

## Supported Units

### Length

- meter
- kilometer
- centimeter
- millimeter
- mile
- yard
- foot
- inch

### Weight

- kilogram
- gram
- milligram
- pound
- ounce

### Temperature

- celsius
- fahrenheit
- kelvin
