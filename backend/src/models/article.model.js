const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  sourceUrl: String,
  isUpdated: { type: Boolean, default: false },
  references: [String]
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
