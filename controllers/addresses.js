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
      .populate("country", "country")
      .populate("state", "state")

      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    Addresses.find()
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.getAddressesByCountryAndStateId = async (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.find({ country: req.query.country, state: req.query.state })
      .populate("country", "country")
      .populate("state", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    Addresses.find({ country: req.query.country, state: req.query.state })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.getAddressesByCountryAndState = async (req, res, next) => {
  if (req.query.populate === "info") {
    Countries.findOne(
      {
        country: req.query.country,
      },
      async (err, country) => {
        if (err) throw err;
        if (!country) {
          return res.status(400).json({
            success: false,
            error: `No states found under ${req.query.country}`,
          });
        } else {
          States.findOne(
            {
              state: req.query.state,
            },
            async (err, state) => {
              if (err) throw err;
              if (!state) {
                return res.status(400).json({
                  success: false,
                  error: `No addresses found under ${req.query.state}`,
                });
              } else {
                await Addresses.find({
                  country: country._id,
                  state: state._id,
                })
                  .populate("country", "country")
                  .populate("state", "state")
                  .then((data) => {
                    return res.status(200).json({ success: true, data: data });
                  })
                  .catch((error) => {
                    return res
                      .status(400)
                      .json({ success: false, error: error });
                  });
              }
            }
          );
        }
      }
    );
  } else {
    Countries.findOne(
      {
        country: req.query.country,
      },
      async (err, country) => {
        if (err) throw err;
        if (!country) {
          return res.status(400).json({
            success: false,
            error: `No states found under ${req.query.country}`,
          });
        } else {
          States.findOne(
            {
              state: req.query.state,
            },
            async (err, state) => {
              if (err) throw err;
              if (!state) {
                return res.status(400).json({
                  success: false,
                  error: `No addresses found under ${req.query.state}`,
                });
              } else {
                await Addresses.find({
                  country: country._id,
                  state: state._id,
                })
                  .then((data) => {
                    return res.status(200).json({ success: true, data: data });
                  })
                  .catch((error) => {
                    return res
                      .status(400)
                      .json({ success: false, error: error });
                  });
              }
            }
          );
        }
      }
    );
  }
};
exports.getAddress = (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.findById(req.params.id)
      .populate("country", "country")
      .populate("state", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    Addresses.findById(req.params.id)
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.updateAddress = async (req, res, next) => {
  await Addresses.findByIdAndUpdate(req.params.id, { ...req.body })
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
