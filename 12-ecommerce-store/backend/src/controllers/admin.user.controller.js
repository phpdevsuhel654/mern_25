const User = require('../models/user.model');

// Get all users
exports.getUsers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const query = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  };

  const users = await User.find(query)
    .select('-password')
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  res.json({
    users,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

// Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

// Update role
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);

  user.role = role;
  await user.save();

  res.json(user);
};

// Create user
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json(user);
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();

  res.json(user);
};