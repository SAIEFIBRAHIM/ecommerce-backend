var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var userVerificationCtrl = require("../controllers/userVerification");
router.get("/request", auth, userVerificationCtrl.requestVerify);
router.get("/", userVerificationCtrl.verifyUser);
module.exports = router;
