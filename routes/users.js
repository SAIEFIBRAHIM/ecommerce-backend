var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/users");
var auth = require("../middlewares/auth");
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getUserId);
router.post("/signup", userCtrl.addUser);
router.put("/:id", auth, userCtrl.updateUserId);
router.delete("/:id", auth, userCtrl.deleteUserId);
router.post("/login", userCtrl.login);
router.post("/token", userCtrl.token);
router.post("/verify/account", auth, userCtrl.requestVerify);
router.get("/verify/account", userCtrl.verifyUser);
router.post("/reset/password", userCtrl.forgetPass);
router.put("/reset/password", userCtrl.resetPass);

module.exports = router;
