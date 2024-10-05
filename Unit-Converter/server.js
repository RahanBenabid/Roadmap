const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const length = {
  millimeter: "millimeter",
  centimeter: "centimeter",
  meter: "meter",
  kilometer: "kilometer",
  inch: "inch",
  foot: "foot",
  yard: "yard",
  mile: "mile",
};

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const pageData = {
    title: "Unit converter",
    heading: "Welcome to unit converter",
    types: ["length", "weight", "temperature"],
    classes: Object.values(length),
  };

  res.render("index", pageData);
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
