var express = require("express");
var router = express.Router();
var productsCtrl = require("../controllers/products");
var multerImages = require("../middlewares/multerImages");

router.post("/", multerImages.array("images"), productsCtrl.addProduct);
router.get("/", productsCtrl.getAllProducts);
router.get("/:id", productsCtrl.getProduct);
router.put(
  "/images/:id",
  multerImages.array("images"),
  productsCtrl.updateProductImages
);
router.put("/:id", productsCtrl.updateProductDetails);
router.delete("/:id", productsCtrl.deleteProduct);
router.delete("/", productsCtrl.deleteManyProducts);

module.exports = router;
