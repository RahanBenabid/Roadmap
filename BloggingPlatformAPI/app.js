const express = require("express");
const { rateLimit } = require("express-rate-limit");

const postRoutes = require("./routes/posts");
const connectDB = require("./config/dbConfig");

// to limit the API calls to be made and avoid any problems (with evil people)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    status: 429,
    error: "Too many requests. Please try again later.",
  },

  handler: (req, res) => {
    console.warn(`Rate limit exceeded by ${req.ip}`);
    res.status(429).json({
      status: 429,
      error: "Rate limit exceeded. Please wait before retrying.",
    });
  },

  keyGenerator: (req) => req.ip,
  onLimitReached: (req, res, options) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
  },
});

const app = express();
app.use(express.json());
const PORT = 3000;

// Apply the rate limiter middleware before your routes
app.use(limiter);

app.use("/", postRoutes);

// connect  to the database
connectDB();

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
