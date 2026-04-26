const stripe = require('../config/stripe');
const Order = require('../models/order.model');

// 🟢 Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // in paise/cents
      currency: 'inr',
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Webhook Handler
exports.stripeWebhook = async (req, res) => {
  const stripe = require('../config/stripe');

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;

    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = 'paid';
      order.paidAt = Date.now();
      await order.save();
    }
  }

  res.json({ received: true });
};