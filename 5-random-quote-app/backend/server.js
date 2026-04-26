const express = require("express");
const cors = require("cors");
require("dotenv").config();

const quoteRoutes = require("./routes/quoteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});