var express = require("express");
var router = express.Router();
var addressesCtrl = require("../controllers/addresses");
var auth = require("../middlewares/auth");
router.get("/", addressesCtrl.getAddresses);
router.get("/id/:id", addressesCtrl.getAddress);
router.get("/search", addressesCtrl.getAddressesByCountryAndState);
router.get("/search/id", addressesCtrl.getAddressesByCountryAndStateId);
router.post("/", auth, addressesCtrl.addAddress);
router.post("/bulk", auth, addressesCtrl.addAddresses);
router.put("/id/:id", auth, addressesCtrl.updateAddress);
router.delete("/id/:id", auth, addressesCtrl.deleteAddress);

module.exports = router;
