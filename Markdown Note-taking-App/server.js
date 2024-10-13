/*
the app should have:
 - check the grammar of the markdown
 - save the notes
 - render the .md in HTML

The implementations should be:
 - an endpoint to check the syntax
 - an exndpoint to save the notes (they're passed as a markdown text)
 - an endpoint to list the saved notes
 - an endpoint to... render? the note, you give it the note and it gives back the HTML
*/

const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

// backend setup
const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/markdown_yt");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  // we can pass anything we want to our ejs file
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`App started and is listening to port ${PORT}`);
});
