const Post = require("../models/post");
const fs = require("fs");
const mongoose = require("mongoose");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const result = await Post.findOne({ _id: postId });

    if (!result) {
      res.status(400).json({ message: "Post not found" });
    }
    res.status(200).json({ post: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tag } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
      tag,
    });
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Added post successfully", post: savedPost });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add the post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
};

// exports.updatePost = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete the post" });
//   }
// };
