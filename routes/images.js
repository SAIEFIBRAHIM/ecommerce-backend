var express = require("express");
var router = express.Router();
var imagesCtrl = require("../controllers/images");
var multerImages = require("../middlewares/multerImages");
router.post("/", multerImages.single("image"), imagesCtrl.singleImageUpload);
module.exports = router;