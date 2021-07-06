const mongoose = require("mongoose");

const url = new mongoose.Schema({
  count: { type: Number, default: 0 },
  randomValue: String,
  inputURL: String,
  newUrlCode: String,
});

const urlSchema = mongoose.model("URL", url);

module.exports = urlSchema;
