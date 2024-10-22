const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/dbConfig");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authenticationRoute = require("./routes/authentication");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.disable("x-powered-by"); // reduces fingerprint, and thus makes the server more secure

app.use("/token", authenticationRoute);
app.use("/users", userRoute);
app.use("/expenses", expenseRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`app running and listening to port ${PORT}`);
});
