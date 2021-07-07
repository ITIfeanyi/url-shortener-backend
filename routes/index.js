const express = require("express");

const router = express.Router();

const getController = require("../controller/getController");
const postController = require("../controller/postController");

router.post("/", postController);

router.get("/*", getController);

module.exports = router;
