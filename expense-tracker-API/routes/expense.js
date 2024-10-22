const express = require("express");
const {
  getOneExpense,
  getAllExpenses,
  createExpense,
  deleteExpense,
  searchExpense,
} = require("./../controllers/expense");
const router = express.Router();

router.get("/search", searchExpense);
router.get("/", getAllExpenses);
router.get("/:id", getOneExpense);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
