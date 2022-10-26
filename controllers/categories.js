const Categories = require("../models/categories");
exports.addCategory = (req, res, next) => {
  const cats = new Categories(req.body);
  cats
    .save()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send(400).json({ success: false, error: err });
    });
};
exports.getAllCategories = (req, res, next) => {
  Categories.find()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send(400).json({ success: false, error: err });
    });
};
exports.getCategory = (req, res, next) => {
  Categories.find({ name: req.params.cat })
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send(400).json({ success: false, error: err });
    });
};
