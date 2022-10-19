const Images = require("../models/images");

const filePathFormatter = (path, baseurl) => {
  const absolutePath = path.replace(/\\/g, "/");
  return `${baseurl}${absolutePath.slice(absolutePath.indexOf("/"))}`;
};
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) return "0 bytes";
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TO"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
exports.singleImageUpload = async (req, res, next) => {
  if (!req.file) {
    console.log("No File provided");
    return res.status(400).send("No File provided");
  }
  console.log(req.file.path);
  const file = new Images({
    fileName: req.file.originalname,
    filePath: filePathFormatter(req.file.path, process.env.BASE_URL),
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2), //2 decimals
  });
  await file
    .save()
    .then((data) => {
      res.status(201).json({
        success: true,
        msg: "Image Uploaded Successfully",
        data: data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ success: false, msg: error });
    });
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
exports.getAllImages = (req, res, next) => {
  Images.find()
    .then((data) => {
      res.status(200).json({ success: true, images: data.length, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status.json({ success: false, error: error });
    });
};
