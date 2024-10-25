const Expense = require("./../models/expense");
const User = require("./../models/user");
const mongoose = require("mongoose");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).populate(
      "userId",
    );
    console.log(expenses);
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get all expense" });
  }
};

exports.getOneExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findOne({
      _id: expenseId,
      userId: req.user._id,
    });

    console.log(expense);
    res.status(200).json({ expense: expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get the expense" });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, description } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newExpense = new Expense({
      userId: userId,
      title: title,
      amount: amount,
      description: description,
    });
    const savedExpense = await newExpense.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { expenses: savedExpense._id } },
      { new: true },
    );

    res.status(201).json({
      message: "Expense saved successfully",
      expense: savedExpense,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to save expense" });
  }
};

// still not complete yet
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    const result = await Expense.deleteOne({ _id: expenseId });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "expense deleted successfully" });
    } else {
      return res.status(400).json({ message: "Unable to find the expense" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete the expense" });
  }
};

exports.searchExpense = async (req, res) => {
  try {
    const { term } = req.query;
    let query = {};

    if (term) {
      query = {
        userId: req.user._id,
        $or: [
          { title: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
        ],
      };

      const response = await Expense.find(query);
      if (!response) {
        res.status(400).json({ message: "no expense found" });
      }

      res.status(200).json({ response });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to search the expense" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { title, amount, description } = req.body;

    // to update only the users own expenses
    const expense = await Expense.findOne({
      _id: expenseId,
      userId: req.user._id, // Verify ownership
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const result = await Expense.updateOne(
      { _id: expenseId },
      {
        $set: {
          title: title,
          amount: amount,
          description: description,
        },
      },
    );

    if (result.matchedCount !== 1) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ error: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to update the expense" });
  }
};
