const User = require("./../models/user");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get all users" });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    console.log(user);
    res.status(200).json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get the user" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const newUser = new User({
      username: username,
      password: password,
      email: email,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User saved successfully", user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to save user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID not valid" });
    }
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "user deleted successfully" });
    } else {
      return res.status(400).json({ message: "Unable to find the user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete the user" });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { term } = req.query;
    let query = {};

    if (term) {
      query = {
        $or: [
          { username: { $regex: term, $options: "i" } },
          { email: { $regex: term, $options: "i" } },
        ],
      };

      const response = await User.find(query);
      if (!response) {
        res.status(400).json({ message: "no user found" });
      }

      res.status(200).json({ response });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to search the user" });
  }
};
