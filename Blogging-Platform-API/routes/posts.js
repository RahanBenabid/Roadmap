const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  getOnePost,
} = require("../controller/post");
const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getOnePost);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

module.exports = router;
