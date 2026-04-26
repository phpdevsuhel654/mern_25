const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  const revenueData = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: revenueData[0]?.totalRevenue || 0,
  });
};

// Monthly Revenue
exports.getRevenueChart = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$totalPrice' },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    // Convert to chart-friendly format
    const months = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];

    const formatted = data.map((item) => ({
      name: months[item._id - 1],
      revenue: item.revenue,
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};