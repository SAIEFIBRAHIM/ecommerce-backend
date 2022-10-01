var express = require("express");
var router = express.Router();
var addressCtrl = require("../controllers/address");
/* GET users listing. */
router.get("/", addressCtrl.getAddress);
router.get("/:id", addressCtrl.getAddressId);
router.get("/country/:country", addressCtrl.getCities);
router.get("/country/:country/city/:city", addressCtrl.getRoads);
router.post("/", addressCtrl.addOneAddress);
router.post("/many", addressCtrl.addManyAddress);
router.put("/:id", addressCtrl.updateAddressId);
router.delete("/:id", addressCtrl.deleteAddress);
module.exports = router;
