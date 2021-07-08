const express = require("express");
const router = express.Router();

const getController = require("../controller/getController");
const postController = require("../controller/postController");
const adminControllerPost = require("../controller/adminControllerPost");
const analyticPost = require("../controller/analyticPost");
const addAdmin = require("../controller/addAdmin");
const dashboardInfo = require("../controller/dashboardInfo");

router.post("/", postController);

router.post("/analytic", analyticPost);

router.post("/admin", adminControllerPost);

router.post("/addAdmin", addAdmin);

router.get("/dashboardInfo", dashboardInfo);

router.get("/*", getController);

module.exports = router;
