const User = require("./../models/user");
const { generateAccessToken } = require("./../token/jwtConfig");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    // console.log("Retrieved user:", user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.isValidPassword(password);
    console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    let options = {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    const token = generateAccessToken(user._id);
    res.cookie("SessionID", token, options);

    const { password: hashedPassword, ...user_data } = user._doc;
    res.status(200).json({
      message: "You have successfully logged in.",
      data: [user_data],
    });
  } catch (err) {
    console.error("Login error:", err); // Enhanced error logging
    res.status(500).json({ message: "Internal server error" });
  }
};
