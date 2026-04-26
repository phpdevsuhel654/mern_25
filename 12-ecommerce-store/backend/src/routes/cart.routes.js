const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', protect, ctrl.getCart);
router.post('/', protect, ctrl.addToCart);
router.put('/:productId', protect, ctrl.updateCartItem);
router.delete('/:productId', protect, ctrl.removeCartItem);
router.delete('/', protect, ctrl.clearCart);

module.exports = router;