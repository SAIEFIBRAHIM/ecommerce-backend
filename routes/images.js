var express = require("express");
var router = express.Router();
var imagesCtrl = require("../controllers/images");
var multerImages = require("../middlewares/multerImages");
router.post("/", multerImages.array("image"), imagesCtrl.singleImageUpload);
router.get("/", imagesCtrl.getAllImages);
router.delete("/", imagesCtrl.deleteAllImages);

module.exports = router;
