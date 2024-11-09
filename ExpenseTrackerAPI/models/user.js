const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // to not send it in requests
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  role: {
    type: String,
    required: true,
    default: "0x01",
  },
  expenses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Expense",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// Method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const dbUser = await mongoose
    .model("User")
    .findById(user._id)
    .select("+password");
  const compare = await bcrypt.compare(password, dbUser.password);
  return compare;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
