const urlSchema = require("../models/urlSchema");
const { handleError } = require("../Errors/urlErrors");
module.exports = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = url.substr(-6);
    //check if url is available
    const result = await urlSchema.findOne({ randomValue: shortUrl });
    if (!result) {
      //throw an error when error is invalid
      throw new Error("invalid url");
    }
    res.status(200).json({
      status: "success",
      analytic: result,
    });
  } catch (error) {
    const err = handleError(error);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};
