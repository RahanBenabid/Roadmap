const express = require("express");

const postRoutes = require("./routes/posts");
const connectDB = require("./config/dbConfig");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/", postRoutes);

// connect  to the database
connectDB();

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
