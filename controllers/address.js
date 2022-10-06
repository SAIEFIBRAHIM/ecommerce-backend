var Address = require("../models/address");
exports.getAddress = (req, res, next) => {
  Address.find()
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, addresses: data.length, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.getAddressId = (req, res, next) => {
  Address.findById(req.params.id)
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
exports.getCities = (req, res, next) => {
  const { country } = req.params;
  Address.find(
    {
      country: `${country.charAt(0).toUpperCase()}${country
        .slice(1)
        .toLowerCase()}`,
    },
    { city: true, road: true }
  )
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, cities: data.length, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.getRoads = (req, res, next) => {
  const { country, city } = req.params;
  Address.find(
    {
      country: `${country.charAt(0).toUpperCase()}${country
        .slice(1)
        .toLowerCase()}`,
      city: `${city.charAt(0).toUpperCase()}${city.slice(1).toLowerCase()}`,
    },
    { road: true }
  )
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, found: data.length, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.addOneAddress = (req, res, next) => {
  var address = new Address(req.body);
  address
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        msg: "Successful created new Address",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ err: err });
    });
};
exports.updateAddressId = (req, res, next) => {
  Address.findByIdAndUpdate(req.params.id, req.body)
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
exports.deleteAddress = (req, res, next) => {
  Address.findByIdAndDelete(req.params.id)
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
