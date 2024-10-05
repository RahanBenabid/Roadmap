const Post = require("../models/post");
const fs = require("fs");

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
