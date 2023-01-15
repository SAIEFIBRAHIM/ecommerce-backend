const States = require("../models/states");
const Countries = require("../models/countries");

exports.addState = async (req, res, next) => {
  const State = new States({ ...req.body });
  State.save()
    .then((data) => {
      return res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.addStates = (req, res, next) => {
  try {
    const statesArray = [];
    req.body.forEach(async (state) => {
      const State = new States({
        ...state,
      });
      State.save();
      statesArray.push(State);
    });
    res
      .status(201)
      .json({ success: true, saved: statesArray.length, data: statesArray });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

exports.getStates = (req, res, next) => {
  if (req.query.populate === "info") {
    States.find()
      .populate("country", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    States.find()
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};

exports.getStatesByCountryId = async (req, res, next) => {
  if (req.query.populate === "info") {
    States.find({ country: req.query.country })
      .populate("country", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    States.find({ country: req.query.country })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.getStatesByCountryName = (req, res, next) => {
  if (req.query.populate === "info") {
    Countries.findOne(
      {
        country: `${req.query.country
          .charAt(0)
          .toUpperCase()}${req.query.country.slice(1).toLowerCase()}`,
      },
      async (err, found) => {
        if (err) throw err;
        if (!found) {
          return res.status(400).json({
            success: false,
            error: `No states found under ${req.query.country}`,
          });
        } else {
          await States.find({
            country: found._id,
          })
            .populate("country", "country")
            .then((data) => {
              return res.status(200).json({ success: true, data: data });
            })
            .catch((error) => {
              return res.status(400).json({ success: false, error: error });
            });
        }
      }
    );
  } else {
    Countries.findOne(
      {
        country: `${req.query.country
          .charAt(0)
          .toUpperCase()}${req.query.country.slice(1).toLowerCase()}`,
      },
      async (err, found) => {
        if (err) throw err;
        if (!found) {
          return res.status(400).json({
            success: false,
            error: `No states found under ${req.query.country}`,
          });
        } else {
          await States.find({
            country: found._id,
          })
            .then((data) => {
              return res.status(200).json({ success: true, data: data });
            })
            .catch((error) => {
              return res.status(400).json({ success: false, error: error });
            });
        }
      }
    );
  }
};
exports.getState = (req, res, next) => {
  if (req.query.populate === "info") {
    States.findById(req.params.id)
      .populate("country", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    States.findById(req.params.id)
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.updateState = async (req, res, next) => {
  States.findByIdAndUpdate(
    req.params.id,
    { ...req.body }
      .then((result) => {
        return res.status(200).json({ success: true, data: result });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      })
  ).catch((err) => {
    return res.status(400).json({ success: false, error: err });
  });
};
exports.deleteState = (req, res, next) => {
  States.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ deleted: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ deleted: false, error: error });
    });
};
