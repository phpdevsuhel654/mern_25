const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/admin.analytics.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.get('/dashboard', protect, adminOnly, ctrl.getDashboardStats);
router.get('/revenue', protect, adminOnly, ctrl.getRevenueChart);

module.exports = router;