const mongoose = require("mongoose");
const marked = require("marked");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
