const express = require("express");
const app = express();
const PORT = 3000;
const { connectDB } = require("./config/dbConfig");

app.use(express.json());
connectDB();

app.listen(PORT, () => {
  console.log(`app running and listening to port ${PORT}`);
});
