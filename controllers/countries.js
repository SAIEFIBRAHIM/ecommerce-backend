const Countries = require("../models/countries");

exports.addCountry = (req, res, next) => {
  const Country = new Countries({ ...req.body });
  Country.save()
    .then((data) => {
      return res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.addCountries = async (req, res, next) => {
  await Countries.insertMany(req.body)
    .then((data) => {
      return res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.getCountries = (req, res, next) => {
  Countries.find()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.getCountry = async (req, res, next) => {
  await Countries.findById(req.params.id)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.updateCountry = (req, res, next) => {
  Countries.findByIdAndUpdate(req.params.id, { ...req.body })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(req.baseUrl.slice(5));
      return res.status(400).json({ success: false, error: error });
    });
};
exports.deleteCountry = (req, res, next) => {
  Countries.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ deleted: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ deleted: false, error: error });
    });
};
