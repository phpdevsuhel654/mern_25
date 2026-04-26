const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");


// CREATE TODO
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    // 🔍 Search query
    const query = {
      title: { $regex: search, $options: "i" },
    };

    // 📊 Total count
    const total = await Todo.countDocuments(query);

    // 📄 Paginated data
    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;