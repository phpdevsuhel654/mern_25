import mongoose from "mongoose";

const schema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  description: String,
  searchedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("SearchHistory", schema);