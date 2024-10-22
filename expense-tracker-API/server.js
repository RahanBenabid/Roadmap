const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/dbConfig");

const authenticationRoute = require("./routes/authentication");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");

app.use(express.json());

app.use("/token", authenticationRoute);
app.use("/users", userRoute);
app.use("/expenses", expenseRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`app running and listening to port ${PORT}`);
});
