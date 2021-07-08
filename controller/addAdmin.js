const adminSchema = require("../models/adminSchema");
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminSchema.create({ email, password });

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
    });
  }
};
