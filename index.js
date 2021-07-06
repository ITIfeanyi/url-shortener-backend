const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const validator = require("validator");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
const urlschema = require("./models/url.model");

//db
require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleError = (error) => {
  let err = "";
  if (error.message === "url does not exit") {
    err = "url does not exit";
  }
  if (error.message === "invalid url") {
    err = "invalid url";
  }
  return error.message;
};

let count = 0;

app.post("https://url-shortener00.herokuapp.com", async (req, res) => {
  try {
    let { inputURL } = req.body;

    //check if url is valid....
    const validURL = validator.isURL(inputURL);

    if (!validURL) {
      //throw an error when error is invalid
      throw new Error("invalid url");
    }

    //search for url in db
    const urlResult = await urlschema.findOne({ inputURL });

    if (!urlResult) {
      //save url if it's not saved

      const randomValue = crypto.randomBytes(3).toString("hex");
      newUrlCode = "https://url-shortener00.herokuapp.com/" + randomValue;
      const newUrl = await new urlschema({
        inputURL,
        randomValue,
        newUrlCode,
      });
      await newUrl.save();
      res.status(200).json({
        status: "success",
        url: newUrlCode,
      });
    } else {
      res.status(200).json({
        status: "success",
        url: urlResult.newUrlCode,
      });
    }
  } catch (err) {
    const error = handleError(err);
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
});

app.get("https://url-shortener00.herokuapp.com/*", async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;

    const result = await urlschema.findOne(url);
    if (!result) {
      throw new Error("url does not exit");
    }
    count++;
    return res.status(200).json({
      status: "success",
      url: result.inputURL,
      count,
    });
  } catch (error) {
    const err = handleError(error);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
