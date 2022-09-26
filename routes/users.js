var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user");
/* GET users listing. */
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserId);
router.post("/", userCtrl.addUser);
router.put("/:id", userCtrl.updateUserId);
router.delete("/:id", userCtrl.deleteUserId);

module.exports = router;
