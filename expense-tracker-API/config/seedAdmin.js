const User = require("./../models/user");

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      const adminUser = new User({
        username: "admin",
        email: "admin@gmail.com",
        password: "0000",
        role: "0x88",
      });

      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error(error);
  }
};

module.exports = { createAdminUser };
