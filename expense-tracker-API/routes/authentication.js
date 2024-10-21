const express = require("express");
const {
  generateAccessToken,
  authenticateToken,
} = require("./../token/jwtConfig");

const router = express.Router();

router.post("/create", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  const token = generateAccessToken(username);
  res.json({ token: token });
});

router.get("/verify", authenticateToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
