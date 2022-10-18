var express = require("express");
var router = express.Router();
var fileCtrl = require("../controllers/file");
var auth = require("../middlewares/auth");
router.get("/");
module.exports = router;
