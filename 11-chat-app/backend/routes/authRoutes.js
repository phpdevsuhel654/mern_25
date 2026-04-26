const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", require("../middleware/authMiddleware").protect, getUsers);

module.exports = router;
