const express = require("express");
const {
  getOneUser,
  getAllUsers,
  createUser,
  deleteUser,
  searchUser,
} = require("./../controllers/user");
const { login } = require("./../controllers/auth");
const router = express.Router();

router.get("/search", searchUser);
router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
