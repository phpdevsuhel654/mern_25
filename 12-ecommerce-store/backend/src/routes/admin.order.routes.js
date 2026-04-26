const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/admin.order.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.get('/', protect, adminOnly, ctrl.getOrders);

module.exports = router;