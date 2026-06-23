const express = require('express');
const cors = require('cors');
const conversionRoutes = require('./routes/conversionRoutes');
const env = require('./config/env');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = env.corsOrigin
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.includes('*')) {
  app.use(cors());
} else {
  app.use(cors({ origin: allowedOrigins }));
}

app.use(express.json());

app.use('/api/converter', conversionRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
