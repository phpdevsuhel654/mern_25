const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/wishlist.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', protect, ctrl.getWishlist);
router.post('/', protect, ctrl.addToWishlist);
router.delete('/:productId', protect, ctrl.removeFromWishlist);

module.exports = router;