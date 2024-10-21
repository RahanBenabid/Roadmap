const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    match: /.+\@.+\..+/,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
