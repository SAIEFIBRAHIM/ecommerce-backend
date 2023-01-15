const Images = require("../models/images");
const filePathFormatter = (path, baseurl) => {
  const absolutePath = path.replace(/\\/g, "/");
  return `${baseurl}/${absolutePath}`;
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
  if (!req.files) {
    return res.status(400).send("No File provided");
  }

  try {
    const filesArray = [];
    req.files.forEach((element) => {
      const file = new Images({
        fileName: element.originalname,
        filePath: filePathFormatter(element.path, process.env.BASE_URL),
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      });
      file.save();
      filesArray.push(file);
    });
    res
      .status(201)
      .json({ success: true, uploaded: filesArray.length, data: filesArray });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
exports.getAllImages = (req, res, next) => {
  Images.find()
    .then((data) => {
      res.status(200).json({ success: true, images: data.length, data: data });
    })
    .catch((error) => {
      res.status.json({ success: false, error: error });
    });
};
exports.deleteAllImages = (req, res, next) => {
  Images.deleteMany({ fileType: "image/png" })
    .then((data) => {
      res.status(200).json({ deleted: true });
    })
    .catch((error) => {
      res.status.json({ success: false, error: error });
    });
};
