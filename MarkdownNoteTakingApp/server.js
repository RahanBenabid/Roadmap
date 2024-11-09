/*
the app should have:
 - check the grammar of the markdown
 - save the notes
 - render the .md in HTML

The implementations should be:
 - an endpoint to check the syntax
 - an endpoint to save the notes (they're passed as a markdown text)
 - an endpoint to list the saved notes
 - an endpoint to... render? the note, you give it the note and it gives back the HTML
*/

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const articleRouter = require("./routes/articles");
const noteRouter = require("./routes/notes");

const Article = require("./models/article");

mongoose.connect("mongodb://localhost/markdown_yt");

// backend setup
const PORT = 3000;
const app = express();
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
// whenever we use _method we will override the method
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  // we can pass anything we want to our ejs file
  res.render("articles/index", { articles: articles });
});

app.use("/api", noteRouter);
app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`App started and is listening to port ${PORT}`);
});
