const States = require("../models/states");
const Countries = require("../models/countries");
const Addresses = require("../models/addresses");

exports.addAddress = async (req, res, next) => {
  const Address = new Addresses({ ...req.body });
  Address.save()
    .then((data) => {
      return res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.addAddresses = (req, res, next) => {
  req.body.forEach(async (address) => {
    const Address = new Addresses({ ...address });
    Address.save()
      .then((data) => {
        return res.status(201).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
};

exports.getAddresses = (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.find()
      .populate("Countries", "_id", "country")
      .populate("States", "_id", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  Addresses.find()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.getAddressesByCountryAndState = async (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.find({ country: req.query.country, state: req.query.state })
      .populate("Countries", "_id", "country")
      .populate("States", "_id", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  Addresses.find({ country: req.query.country, state: req.query.state })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.getAddress = (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.findById(req.params.id)
      .populate("Countries", "_id", "country")
      .populate("States", "_id", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  Addresses.findById(req.params.id)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.updateAddress = async (req, res, next) => {
  await Addresses.findByIdAndUpdate(req.params.id)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.deleteAddress = (req, res, next) => {
  Addresses.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ deleted: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ deleted: false, error: error });
    });
};
