const mongoose = require("mongoose");

function connectDB() {
  const DATABASE_NAME = "expenses";
  mongoose
    .connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
    .then(() => console.log("successfully connected to the database"))
    .catch((error) => {
      console.log("Error when connecting to the database: ", error);
    });
}

module.exports = connectDB();
