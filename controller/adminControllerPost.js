const adminSchema = require("../models/adminSchema");
const { handleAdminError } = require("../Errors/adminErros");
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminSchema.findOne({ email });

    if (!user) {
      throw new Error("admin not found");
    }
    if (user.password !== password) {
      throw new Error("incorrect password");
    }

    res.status(200).json({
      status: "success",
      adminID: user._id,
    });
  } catch (error) {
    const err = handleAdminError(error);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};
