const express = require("express");
const Note = require("../models/note");
const router = express.Router();
const marked = require("marked");
const fs = require("fs");
const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });

app.post("/check-grammar", async (req, res) => {
  const { markdownText } = req.body;
  const plainText = removeMarkdown(markdownText);

  const result = await manager.process("en", plainText);

  res.json(result);
});

const removeMarkdown = require("remove-markdown");

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    console.log(notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Parse the Markdown content to HTML
    const parsedHtml = marked.parse(content);

    // Write the content to a file with a validated/sanitized title
    fs.writeFile(`./database/${title}.md`, content, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Couldn't save the note" });
      } else {
        console.log("File written successfully");
        return res
          .status(200)
          .json({ message: "Note saved", html: parsedHtml });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Couldn't render" });
  }
});

module.exports = router;
