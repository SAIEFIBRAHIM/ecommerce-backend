var express = require("express");
var router = express.Router();
var passResetCtrl = require("../controllers/passReset");
router.get("/request", passResetCtrl.forgetPass);
router.get("/", passResetCtrl.resetPass);
router.put("/update", passResetCtrl.updateUserPass);
module.exports = router;
