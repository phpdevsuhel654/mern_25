const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

// Create payment
router.post('/create-intent', protect, ctrl.createPaymentIntent);

// Webhook (NO auth, raw body required)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  ctrl.stripeWebhook
);

module.exports = router;