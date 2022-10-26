var express = require("express");
var router = express.Router();
var CatgoriesCtrl = require("../controllers/categories");
router.post("/", CatgoriesCtrl.addCategory);
router.get("/", CatgoriesCtrl.getAllCategories);
router.get("/:cat", CatgoriesCtrl.getCategory);

module.exports = router;
