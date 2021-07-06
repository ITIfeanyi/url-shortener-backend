const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");
const validator = require("validator");

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
const urlschema = require("./models/urlSchema");

//db
require("./config/db");

app.set("view engine", "ejs");
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
  return err;
};

app.post("/", async (req, res) => {
  try {
    const { inputURL } = req.body;
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

      //generate a random key
      const randomValue = crypto.randomBytes(3).toString("hex");
      const newUrlCode = `https://powerful-lake-07951.herokuapp.com/${randomValue}`;
      const newUrl = await new urlschema({
        inputURL,
        randomValue,
        newUrlCode,
      });
      await newUrl.save();
      res.status(200).json({
        status: "success",
        url: newUrl.newUrlCode,
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

//get request
app.get("/*", async (req, res) => {
  try {
    const url = Object.values(req.params);
    const shortURL = url[0];

    const result = await urlschema.findOne({ randomValue: shortURL });
    if (!result) {
      throw new Error("url does not exit");
    }

    res.redirect(result.inputURL);
  } catch (error) {
    const err = handleError(error);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
