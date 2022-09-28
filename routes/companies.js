var express = require("express");
var router = express.Router();
var companyCtrl = require("../controllers/company");
/* GET users listing. */
router.get("/", companyCtrl.getCompanies);
router.get("/:id", companyCtrl.getCompaniesId);
router.post("/", companyCtrl.addCompanies);
router.put("/:id", companyCtrl.updateCompaniesId);
router.delete("/:id", companyCtrl.deleteCompaniesId);

module.exports = router;
