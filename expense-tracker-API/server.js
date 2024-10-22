const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/dbConfig");

const authenticationRoute = require("./routes/authentication");
const userRoute = require("./routes/user");

app.use(express.json());

app.use("/token", authenticationRoute);
app.use("/users", userRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`app running and listening to port ${PORT}`);
});
