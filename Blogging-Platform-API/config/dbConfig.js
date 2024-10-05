const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://localhost:27017/blogging_api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => console.log("Connected to the database successfully"))
    .catch((error) =>
      console.log("Error when connecting to the database:", error),
    );
}

module.exports = connectDB;
