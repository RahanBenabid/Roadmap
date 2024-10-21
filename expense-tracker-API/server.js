const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/dbConfig");

const authenticationRoute = require("./routes/authentication");

app.use(express.json());

app.use("/token", authenticationRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`app running and listening to port ${PORT}`);
});
