const express = require("express");
const {
  getOneUser,
  getAllUsers,
  createUser,
  deleteUser,
  searchUser,
} = require("./../controllers/user");
const { login } = require("./../controllers/auth");
const { verify } = require("./../middleware/verify");
const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes - add verify middleware
router.get("/search", verify, searchUser);
router.get("/", verify, getAllUsers);
router.post("/", verify, createUser);
router.get("/:id", verify, getOneUser);
router.delete("/:id", verify, deleteUser);

module.exports = router;
