const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

// 🟢 Create Order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order from cart snapshot
    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      shippingAddress,
      totalPrice: cart.totalPrice,
      paymentMethod,
    });

    // Clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 Get My Orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};


// 🟡 Get Order By ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
};


// 🟠 Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  order.orderStatus = status;

  if (status === 'delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.json(order);
};


// 💳 Mark Payment Paid
exports.markAsPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.paymentStatus = 'paid';
  order.paidAt = Date.now();

  await order.save();

  res.json(order);
};