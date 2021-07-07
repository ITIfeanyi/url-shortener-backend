const useragent = require("useragent");
const urlschema = require("../models/urlSchema");
const { handleError } = require("../Errors/urlErrors");

//get request
module.exports = async (req, res) => {
  try {
    const agent = useragent.parse(req.headers["user-agent"]);

    //arrange the visitor's metadata
    const userInfo = {
      family: agent.family,
      os: agent.os,
      device: agent.device,
      source: agent.source,
    };
    const url = Object.values(req.params);
    const shortURL = url[0];

    //increment the count in the database
    const result = await urlschema.findOneAndUpdate(
      { randomValue: shortURL },
      { $inc: { count: 1 } }
    );

    if (!result) {
      throw new Error("url does not exit");
    }

    //push visitors info into the db
    await urlschema.findOneAndUpdate(
      { randomValue: shortURL },
      { $push: { userAgent: userInfo } }
    );

    res.redirect(result.inputURL);
  } catch (error) {
    const err = handleError(error);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};
