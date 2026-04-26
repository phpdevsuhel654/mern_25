const { fetchRandomQuote } = require("../services/quoteService");

exports.getRandomQuote = async (req, res) => {
  try {
    const quote = await fetchRandomQuote();
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quote" });
  }
};