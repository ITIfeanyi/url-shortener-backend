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

app.post("https://powerful-lake-07951.herokuapp.com", async (req, res) => {
  const { inputURL } = req.body;

  const newUrlCode = `https://powerful-lake-07951.herokuapp.com/0000`;
  const newUrl = await new urlschema({
    inputURL,
    newUrlCode,
  });
  await newUrl.save();
  res.status(200).json({
    status: "success",
    url: newUrl.newUrlCode,
  });
});

// app.post("https://powerful-lake-07951.herokuapp.com/url", async (req, res) => {
//   try {
//     console.log(req.body);

//     const { inputURL } = req.body;
//     //check if url is valid....
//     const validURL = validator.isURL(inputURL);

//     // if (!validURL) {
//     //   //throw an error when error is invalid
//     //   throw new Error("invalid url");
//     // }

//     //search for url in db
//     const urlResult = await urlschema.findOne({ inputURL });

//     if (!urlResult) {
//       //save url if it's not saved

//       const randomValue = crypto.randomBytes(3).toString("hex");
//       console.log(randomValue);
//       const newUrlCode = `https://powerful-lake-07951.herokuapp.com/${randomValue}`;
//       const newUrl = await new urlschema({
//         inputURL,
//         randomValue,
//         newUrlCode,
//       });
//       await newUrl.save();
//       res.status(200).json({
//         status: "success",
//         url: newUrl.newUrlCode,
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         url: urlResult.newUrlCode,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     // const error = handleError(err);
//     // res.status(500).json({
//     //   status: "error",
//     //   error: error,
//     // });
//   }
// });

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
