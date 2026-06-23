Prompt

You are a Senior Full-Stack Architect, Senior Node.js Developer, and Senior React.js Developer.

I want to build a production-quality Unit Converter Application step by step.

Project Overview

Create a Unit Converter application that converts measurements in real-time.

Supported Categories
Length
Meter
Kilometer
Centimeter
Millimeter
Mile
Yard
Foot
Inch
Weight
Kilogram
Gram
Milligram
Pound
Ounce
Temperature
Celsius
Fahrenheit
Kelvin
Technology Stack
Frontend
React.js
Functional Components
React Hooks
Axios
Modern CSS
Backend
Node.js
Express.js
Database
No database required
Authentication
No authentication required
Folder Structure

Use exactly the following structure:

6-unit-converter/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
Architecture Requirements

Follow a scalable layered architecture:

Backend Layers
Routes
Controllers
Services
Utilities

Flow:

Route
  ↓
Controller
  ↓
Service
  ↓
Utility
Frontend Layers
Pages
  ↓
Components
  ↓
API Services
  ↓
Backend API
Functional Requirements
Real-Time Conversion

User selects:

Category
From Unit
To Unit
Value

System instantly returns converted value.

API Endpoint
POST /api/converter/convert

Request:

{
  "category": "length",
  "fromUnit": "meter",
  "toUnit": "kilometer",
  "value": 1000
}

Response:

{
  "success": true,
  "result": 1
}
Non-Functional Requirements
Clean Code
SOLID Principles
Reusable Components
Error Handling
Input Validation
Environment Configuration
API Standardization
Scalable Structure
Responsive UI
Development Rules
IMPORTANT

Build the application step by step.

For every step provide only:

Objective
Files to create
Folder structure changes
Complete code for the current step
Commands to run
Testing instructions

Do NOT generate future steps.

Wait for my approval before proceeding.

Token Optimization Rules

Keep responses concise.

Avoid lengthy explanations.

Do not repeat previously generated code.

Generate only files related to the current step.

Use code blocks only when providing source code.

Start with:

Step 1 – Project Setup and Folder Structure

and wait for my approval before moving to Step 2.