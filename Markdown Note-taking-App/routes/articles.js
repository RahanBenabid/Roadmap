const express = require("express");
const Articles = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Articles() });
});

router.get("/:id", async (req, res) => {
  const article = await Articles.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("/articles/show", { article: article });
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    // redirect to the same page, and have the fields prefilled for better UX
    console.log(error);
    res.render("/articles/new", { article: article });
  }
});

module.exports = router;
