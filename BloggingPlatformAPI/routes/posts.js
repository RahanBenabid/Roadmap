const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  getOnePost,
  updatePost,
  searchPost,
} = require("../controller/post");
const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getOnePost);
router.get("/search", searchPost);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);

module.exports = router;
