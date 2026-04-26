const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Helper: calculate totals
const calculateTotals = (cart) => {
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};

// Get Cart
exports.getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  res.json(cart);
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity,
    });
  }

  calculateTotals(cart);
  await cart.save();

  res.json(cart);
};

// Update Quantity
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.quantity = quantity;

  calculateTotals(cart);
  await cart.save();

  res.json(cart);
};

// Remove Item
exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );

  calculateTotals(cart);
  await cart.save();

  res.json(cart);
};

// Clear Cart
exports.clearCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.json(cart);
};