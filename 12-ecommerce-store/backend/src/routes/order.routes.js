const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/order.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

// User
router.post('/', protect, ctrl.createOrder);
router.get('/my', protect, ctrl.getMyOrders);
router.get('/:id', protect, ctrl.getOrderById);

// Admin
router.put('/:id/status', protect, adminOnly, ctrl.updateOrderStatus);
router.put('/:id/pay', protect, ctrl.markAsPaid);

module.exports = router;