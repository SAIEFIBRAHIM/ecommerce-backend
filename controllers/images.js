exports.singleImageUpload = async (req, res, next) => {
  try {
    const image = req.file;
    res.status(201).json({ success: true, msg: "Image Uploaded Successfully" });
    console.log(image);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error });
  }
};
