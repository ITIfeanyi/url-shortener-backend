const urlSchema = require("../models/urlSchema");

module.exports = async (req, res) => {
  try {
    const result = await urlSchema.find();
    if (result) {
      res.status(200).json({
        status: "success",
        urls: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};
