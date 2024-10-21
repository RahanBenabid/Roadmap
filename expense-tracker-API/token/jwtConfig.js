const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
  // gets the token from the autho header request
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if no token is found response with a 401 response
  if (token == null) return res.sendStatus(401);

  // verifies if the token is valid (not expired and all)
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    console.log(error);
    if (error) {
      console.error("Token verfication failed:", error);
    }
    req.user = user;
    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
