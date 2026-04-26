const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

// Public
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProductById);

// Admin
router.post('/', protect, adminOnly, productController.createProduct);
router.put('/:id', protect, adminOnly, productController.updateProduct);
router.put('/:id/stock', protect, adminOnly, productController.updateStock);9
router.delete('/:id', protect, adminOnly, productController.deleteProduct);

module.exports = router;