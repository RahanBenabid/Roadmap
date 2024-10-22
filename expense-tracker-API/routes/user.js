const express = require("express");
const {
  getOneUser,
  getAllUsers,
  createUser,
  deleteUser,
  searchUser,
} = require("./../controllers/user");
const router = express.Router();

router.get("/search", searchUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
