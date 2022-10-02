var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user");

var auth = require("../middlewares/auth");
/* GET users listing. */
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getUserId);
router.post("/signup", userCtrl.addUser);
router.put("/:id", auth, userCtrl.updateUserId);
router.delete("/:id", auth, userCtrl.deleteUserId);
router.post("/login", userCtrl.login);

module.exports = router;
