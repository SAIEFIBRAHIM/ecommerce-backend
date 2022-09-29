var Address = require("../models/address");
exports.getAddress = (req, res, next) => {
  Address.find()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.getAddressId = (req, res, next) => {
  Address.findById(req.params)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.addManyAddress = (req, res, next) => {
  Address.insertMany(req.body)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
