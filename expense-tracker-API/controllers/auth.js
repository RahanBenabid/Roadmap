const User = require("./../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log("Retrieved user:", user);
    if (!user)
      return res.status(401).json({
        message: "Invalid email or password",
      });
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }
    const { password: hashedPassword, ...user_data } = user._doc;
    res.status(200).json({
      message: "You have successfully logged in.",
      data: [user_data],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
