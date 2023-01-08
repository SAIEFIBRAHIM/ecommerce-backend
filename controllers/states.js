const States = require("../models/states");
const Countries = require("../models/countries");

exports.addState = async (req, res, next) => {
  const Country = await Countries.findOne({
    $or: [
      { _id: req.body.country },
      {
        country: `${req.body.country.charAt(0).toUpperCase()}${req.body.country
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  });

  const State = new States({
    ...req.body,
    country: Country._id,
  });
  State.save()
    .then((data) => {
      return res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.addStates = (req, res, next) => {
  req.body.forEach(async (state) => {
    const Country = await Countries.findOne({
      $or: [
        { _id: state.country },
        {
          country: `${state.country.charAt(0).toUpperCase()}${state.country
            .slice(1)
            .toLowerCase()}`,
        },
      ],
    });

    const State = new States({
      ...state,
      country: Country._id,
    });
    State.save()
      .then((data) => {
        return res.status(201).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
};

exports.getStates = (req, res, next) => {
  if (req.query.populate === "country") {
    States.find()
      .populate("Countries", "_id", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  States.find()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.getStatesByCountry = async (req, res, next) => {
  const Country = await Countries.findOne({
    $or: [
      { _id: req.query.country },
      {
        state: `${req.query.country.charAt(0).toUpperCase()}${req.query.country
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  });
  if (req.query.populate === "country") {
    States.find({ country: Country._id })
      .populate("Countries", "_id", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  States.find({ country: Country._id })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.getState = (req, res, next) => {
  if (req.query.populate === "country") {
    States.findOne({
      $or: [
        { _id: req.params.state },
        {
          state: `${req.params.state.charAt(0).toUpperCase()}${req.params.state
            .slice(1)
            .toLowerCase()}`,
        },
      ],
    })
      .populate("Countries", "_id", "country")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  States.findOne({
    $or: [
      { _id: req.params.state },
      {
        state: `${req.params.state.charAt(0).toUpperCase()}${req.params.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.updateState = async (req, res, next) => {
  States.findOne({
    $or: [
      { _id: req.params.state },
      {
        state: `${req.params.state.charAt(0).toUpperCase()}${req.params.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  })
    .then(async (data) => {
      const Country = await Countries.findOne({
        $or: [
          { _id: req.body.country },
          {
            country: `${req.body.country
              .charAt(0)
              .toUpperCase()}${req.body.country.slice(1).toLowerCase()}`,
          },
        ],
      });
      States.updateOne({ _id: data._id }, { ...req.body, country: Country._id })
        .then((result) => {
          return res.status(200).json({ success: true, data: result });
        })
        .catch((error) => {
          return res.status(400).json({ success: false, error: error });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};
exports.deleteState = (req, res, next) => {
  States.findOneAndDelete({
    $or: [
      { _id: req.params.state },
      {
        state: `${req.params.state.charAt(0).toUpperCase()}${req.params.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  })
    .then((data) => {
      return res.status(200).json({ deleted: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ deleted: false, error: error });
    });
};
