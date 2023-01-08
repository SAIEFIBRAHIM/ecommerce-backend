var express = require("express");
var router = express.Router();
var addressesCtrl = require("../controllers/addresses");
var auth = require("../middlewares/auth");
router.get("/", addressesCtrl.getAddresses);
router.get("/:address", addressesCtrl.getAddress);
router.get("/", addressesCtrl.getAddressesByCountryAndState);
router.post("/", auth, addressesCtrl.addAddress);
router.post("/bulk", auth, addressesCtrl.addAddresses);
router.put("/:address", auth, addressesCtrl.updateAddress);
router.delete("/:address", auth, addressesCtrl.deleteAddress);

module.exports = router;
