const Companies = require("../models/companies");
exports.addCompanies = (req, res, next) => {
  var companies = new Companies(req.body);
  companies
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        msg: "Successful created new User",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ err: err });
    });
};
exports.getCompanies = (req, res, next) => {
  req.query.populate === "users"
    ? Companies.find()
        .populate("users")
        .then((data) => {
          console.log(req.query.populate);
          return res.status(200).json({
            success: true,
            companies: data.length,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).json({ err: err });
        })
    : req.query.populate === "users.address"
    ? Companies.find()
        .populate({ path: "users", populate: { path: "address" } })
        .then((data) => {
          console.log(req.query.populate);
          return res.status(200).json({
            success: true,
            companies: data.length,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).json({ err: err });
        })
    : Companies.find()
        .then((data) => {
          return res.status(200).json({
            success: true,
            companies: data.length,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).json({ err: err });
        });
};
exports.getCompaniesId = (req, res, next) => {
  req.query.populate === "users"
    ? Companies.findById(req.params.id)
        .populate("users")
        .then((data) => {
          return res.status(200).json({
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).json({ err: err });
        })
    : Companies.findById(req.params.id)
        .then((data) => {
          return res.status(200).json({
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).json({ err: err });
        });
};
exports.updateCompaniesId = (req, res, next) => {
  Companies.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      return res.status(200).json({
        updated: true,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ err: err });
    });
};
exports.deleteCompaniesId = (req, res, next) => {
  Companies.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({
        deleted: true,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ err: err });
    });
};
