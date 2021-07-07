const crypto = require("crypto");
const validator = require("validator");
const urlschema = require("../models/urlSchema");
const { handleError } = require("../Errors/urlErrors");

module.exports = async (req, res) => {
  try {
    const { inputURL } = req.body;

    //check if url is valid....
    const validURL = validator.isURL(inputURL);

    if (!validURL) {
      //throw an error when error is invalid
      throw new Error("invalid url");
    }
    //generate a random key
    const randomValue = crypto.randomBytes(3).toString("hex");
    const newUrlCode = `https://powerful-lake-07951.herokuapp.com/${randomValue}`;
    const newUrl = await new urlschema({
      inputURL,
      randomValue,
    });
    await newUrl.save();
    res.status(200).json({
      status: "success",
      url: newUrlCode,
    });
  } catch (err) {
    const error = handleError(err);
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
};
