const Products = require("../models/products");
const Categories = require("../models/categories");
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

exports.addProduct = async (req, res, next) => {
  if (!req.files) {
    console.log("No File provided");
    return res.status(400).send("No File provided");
  }
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
  await Categories.find({ name: req.body.categories }).then(async (data) => {
    const catArray = [];
    data.forEach((cat) => {
      catArray.push(cat._id);
    });
    const product = new Products({
      ...req.body,
      categories: catArray,
      images: filesArray,
    });
    await product
      .save()
      .then((result) => {
        res.status(201).json({ success: true, data: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      });
  });
};
exports.getAllProducts = (req, res, next) => {
  if (req.query.populate === "images") {
    Products.find()
      .populate("images")
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  } else if (req.query.populate === "categories") {
    Products.find()
      .populate("categories")
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  } else {
    Products.find()
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  }
};
exports.getProduct = (req, res, next) => {
  if (req.query.populate === "images") {
    Products.findById(req.params.id)
      .populate("images")
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  } else if (req.query.populate === "categories") {
    Products.findById(req.params.id)
      .populate("categories")
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  } else {
    Products.findById(req.params.id)
      .then((data) => {
        res
          .status(200)
          .json({ success: true, products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  }
};
exports.updateProductImages = async (req, res, next) => {
  if (!req.files) {
    console.log("No File provided");
    return res.status(400).send("No File provided");
  }
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
  await Products.findByIdAndUpdate(req.params.id, {
    ...req.body,
    categories: catArray,
    images: filesArray,
  })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.updateProductDetails = async (req, res, next) => {
  await Categories.find({ name: req.body.categories })
    .then(async (data) => {
      const catArray = [];
      data.forEach((cat) => {
        catArray.push(cat._id);
      });
      await Products.findByIdAndUpdate(req.params.id, {
        ...req.body,
        categories: catArray,
      })
        .then((result) => {
          res.status(200).json({ success: true, data: result });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false, error: error });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.deleteProduct = (req, res, next) => {
  Products.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ deleted: true, product: data._id });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ deleted: false, error: error });
    });
};
exports.deleteManyProducts = (req, res, next) => {
  Products.deleteMany({ _id: { $in: req.body } })
    .then((data) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ deleted: false, error: error });
    });
};
