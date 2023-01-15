const { request } = require("express");
var express = require("express");
var router = express.Router();
var countriesCtrl = require("../controllers/countries");
var auth = require("../middlewares/auth");
router.get("/", countriesCtrl.getCountries);
router.get("/id/:id", countriesCtrl.getCountryId);
router.get("/search", countriesCtrl.getCountry);
router.post("/", auth, countriesCtrl.addCountry);
router.post("/bulk", auth, countriesCtrl.addCountries);
router.put("/id/:id", auth, countriesCtrl.updateCountry);
router.delete("/id/:id", auth, countriesCtrl.deleteCountry);

module.exports = router;
