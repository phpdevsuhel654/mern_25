const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/admin.user.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.get('/', protect, adminOnly, ctrl.getUsers);
router.delete('/:id', protect, adminOnly, ctrl.deleteUser);
router.put('/:id/role', protect, adminOnly, ctrl.updateUserRole);
router.post('/', protect, adminOnly, ctrl.createUser);
router.put('/:id', protect, adminOnly, ctrl.updateUser);

module.exports = router;