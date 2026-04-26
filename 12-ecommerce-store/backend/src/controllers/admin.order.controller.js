const Order = require('../models/order.model');

// Get all orders
exports.getOrders = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = {};
  if (status) query.orderStatus = status;

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Order.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    orders,
  });
};