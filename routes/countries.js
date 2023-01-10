var express = require("express");
var router = express.Router();
var countriesCtrl = require("../controllers/countries");
var auth = require("../middlewares/auth");
router.get("/", countriesCtrl.getCountries);
router.get("/:country", countriesCtrl.getCountry);
router.get("/id/:id", countriesCtrl.getCountryById);
router.post("/", auth, countriesCtrl.addCountry);
router.post("/bulk", auth, countriesCtrl.addCountries);
router.put("/:country", auth, countriesCtrl.updateCountry);
router.delete("/:country", auth, countriesCtrl.deleteCountry);

module.exports = router;
