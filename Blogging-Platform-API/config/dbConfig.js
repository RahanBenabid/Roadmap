const mongoose = require("mongoose");

function connectDB() {
  const DATABASE_NAME = "blogging_api";
  mongoose
    .connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
    .then(() => console.log("Connected to the database successfully"))
    .catch((error) =>
      console.log("Error when connecting to the database:", error),
    );
}

module.exports = connectDB;
