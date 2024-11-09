const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["Tech", "Programming"],
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
