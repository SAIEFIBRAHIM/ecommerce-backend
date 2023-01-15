const Categories = require("../models/categories");
exports.addCategory = async (req, res, next) => {
  const cats = new Categories(req.body);
  await cats
    .save()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((err) => {
      res.send(400).json({ success: false, error: err });
    });
};
exports.getAllCategories = async (req, res, next) => {
  await Categories.find()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.send(400).json({ success: false, error: err });
    });
};
exports.getCategory = async (req, res, next) => {
  await Categories.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.send(400).json({ success: false, error: err });
    });
};
exports.updateCategory = async (req, res, next) => {
  await Categories.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updated_at: Date.now(),
  })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.send(400).json({ success: false, error: err });
    });
};
exports.deleteCategory = async (req, res, next) => {
  await Categories.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ deleted: true });
    })
    .catch((err) => {
      res.send(400).json({ deleted: false, error: err });
    });
};
exports.deleteCategories = async (req, res, next) => {
  await Categories.deleteMany({ _id: { $in: req.body } })
    .then((data) => {
      res.status(200).json({ deleted: true });
    })
    .catch((err) => {
      res.send(400).json({ deleted: false, error: err });
    });
};
