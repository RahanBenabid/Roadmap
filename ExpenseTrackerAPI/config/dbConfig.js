const mongoose = require("mongoose");
const seedAdmin = require("./seedAdmin");

function connectDB() {
  const DATABASE_NAME = "expenses";
  return mongoose
    .connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
    .then(() => console.log("successfully connected to the database"))
    .then(async () => {
      await seedAdmin.createAdminUser();
    })
    .catch((error) => {
      console.log("Error when connecting to the database: ", error);
      throw error;
    });
}

module.exports = connectDB;
