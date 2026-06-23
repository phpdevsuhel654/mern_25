const express = require('express');

const { convertMeasurement } = require('../controllers/conversionController');
const validateConversionRequest = require('../middleware/validateConversionRequest');

const router = express.Router();

router.post('/convert', validateConversionRequest, convertMeasurement);

module.exports = router;
