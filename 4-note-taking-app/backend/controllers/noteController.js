const Note = require("../models/Note");
const APIFeatures = require("../utils/apiFeatures");

// CREATE
exports.createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

// GET ALL (with pagination, search, sort)
exports.getNotes = async (req, res) => {
  const resultPerPage = 5;

  const apiFeature = new APIFeatures(Note.find(), req.query)
    .search()
    .filter()
    .sort()
    .paginate(resultPerPage);

  const notes = await apiFeature.query;
  const total = await Note.countDocuments();

  res.json({
    total,
    count: notes.length,
    notes,
  });
};

// GET SINGLE
exports.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

// UPDATE
exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(note);
};

// DELETE
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};