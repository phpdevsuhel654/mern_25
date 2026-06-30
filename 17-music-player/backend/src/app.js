'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const routes = require('./routes');
const requestId = require('./middleware/requestId');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const origins = env.corsOrigin
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsOptions = origins.includes('*')
	? { origin: true, credentials: true }
	: {
			origin: origins,
			credentials: true
		};

app.disable('x-powered-by');
app.use(requestId);
app.use(requestLogger);
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(cors(corsOptions));
app.use(
	rateLimit({
		windowMs: env.rateLimitWindowMs,
		max: env.rateLimitMax,
		standardHeaders: true,
		legacyHeaders: false
	})
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Middleware to allow CORS for static uploads
app.use('/uploads', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Cross-Origin-Resource-Policy', 'cross-origin');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use('/uploads', express.static(require('path').join(__dirname, '../uploads')));

app.use(env.apiPrefix, routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
