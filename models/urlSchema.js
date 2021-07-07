const mongoose = require("mongoose");

const url = new mongoose.Schema({
  randomValue: String,
  inputURL: String,
  count: {
    type: Number,
    default: 0,
  },
  userAgent: [
    {
      family: String,
      os: String,
      device: String,
      source: String,
    },
  ],
});

const urlSchema = mongoose.model("URL", url);

module.exports = urlSchema;
