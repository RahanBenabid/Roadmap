const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const { JSDOM } = require("jsdom");

// to sanatize our HTML and not allow malicious JS inside it
const createDomPurify = require("dompurify");
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanatizeHtml: {
    type: String,
    require: true,
  },
});

// before we save this function will be ran, to validate out model every time we create a new object
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanatizeHtml = dompurify.sanitize(marked.parse(this.markdown));
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);
