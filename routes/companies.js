var express = require("express");
var router = express.Router();
var companyCtrl = require("../controllers/company");
var auth = require("../middlewares/auth");
/* GET users listing. */
router.get("/", companyCtrl.getCompanies);
router.get("/:id", companyCtrl.getCompaniesId);
router.post("/", auth, companyCtrl.addCompanies);
router.put("/:id", auth, companyCtrl.updateCompaniesId);
router.delete("/:id", auth, companyCtrl.deleteCompaniesId);

module.exports = router;
