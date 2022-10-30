var express = require("express");
var router = express.Router();
var CatgoriesCtrl = require("../controllers/categories");
router.post("/", CatgoriesCtrl.addCategory);
router.get("/", CatgoriesCtrl.getAllCategories);
router.get("/:id", CatgoriesCtrl.getCategory);
router.put("/:id", CatgoriesCtrl.updateCategory);
router.delete("/:id", CatgoriesCtrl.deleteCategory);
router.delete("/", CatgoriesCtrl.deleteCategories);

module.exports = router;
