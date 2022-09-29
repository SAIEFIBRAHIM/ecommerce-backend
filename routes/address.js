var express = require("express");
var router = express.Router();
var addressCtrl = require("../controllers/address");
/* GET users listing. */
router.get("/", addressCtrl.getAddress);
router.get("/:id", addressCtrl.getAddressId);
router.post("/", addressCtrl.addManyAddress);

module.exports = router;
