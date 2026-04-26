router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Todo.countDocuments(query);

    res.json({
      todos,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});