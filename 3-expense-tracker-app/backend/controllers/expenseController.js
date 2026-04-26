const Expense = require("../models/Expense");

// CREATE
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user,
    });

    res.json(expense);
  } catch {
    res.status(500).json({ message: "Error creating expense" });
  }
};

// GET ALL (with filter + pagination)
exports.getExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, startDate, endDate } = req.query;

    const query = { user: req.user };

    if (category) query.category = category;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Expense.countDocuments(query);

    res.json({
      expenses,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// UPDATE
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user)
      return res.status(404).json({ message: "Not found" });

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user)
      return res.status(404).json({ message: "Not found" });

    await expense.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

// REPORT: Category-wise
exports.getCategoryReport = async (req, res) => {
  try {
    const data = await Expense.aggregate([
      { $match: { user: req.user } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch {
    res.status(500).json({ message: "Report error" });
  }
};

// REPORT: Monthly
exports.getMonthlyReport = async (req, res) => {
  try {
    const data = await Expense.aggregate([
      { $match: { user: req.user } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch {
    res.status(500).json({ message: "Report error" });
  }
};