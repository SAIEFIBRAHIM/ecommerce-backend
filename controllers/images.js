const ImagesModel = require("../models/images");

exports.singleImageUpload = async (req, res, next) => {
  try {
    const file = new ImagesModel({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), //2 decimals
    });
    await file.save();
    res.status(201).json({ success: true, msg: "Image Uploaded Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};
exports.multipleImageUpload = async (req, res, next) => {
  try {
    const images = [];
    req.files.forEach((element) => {});
    res
      .status(201)
      .json({ success: true, msg: "Images Uploaded Successfully" });
    console.log(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: error });
  }
};
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) return "0 bytes";
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TO"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat(
    bytes / Math.pow(1000, index).toFixed(dm) + "" + sizes[index]
  );
};
