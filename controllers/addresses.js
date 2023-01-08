const States = require("../models/states");
const Countries = require("../models/countries");
const Addresses = require("../models/addresses");

exports.addAddress = async (req, res, next) => {
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
  const State = await States.findOne({
    $or: [
      { _id: req.body.state },
      {
        state: `${req.body.state.charAt(0).toUpperCase()}${req.body.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  });

  const Address = new Addresses({
    ...req.body,
    country: Country._id,
    state: State._id,
  });
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
    const Country = await Countries.findOne({
      $or: [
        { _id: address.country },
        {
          country: `${address.country.charAt(0).toUpperCase()}${address.country
            .slice(1)
            .toLowerCase()}`,
        },
      ],
    });
    const State = await States.findOne({
      $or: [
        { _id: address.state },
        {
          state: `${address.state.charAt(0).toUpperCase()}${address.state
            .slice(1)
            .toLowerCase()}`,
        },
      ],
    });

    const Address = new Addresses({
      ...address,
      country: Country._id,
      state: State._id,
    });
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
  const Country = await Countries.findOne({
    $or: [
      { _id: req.query.country },
      {
        country: `${req.query.country
          .charAt(0)
          .toUpperCase()}${req.query.country.slice(1).toLowerCase()}`,
      },
    ],
  });
  const State = await States.findOne({
    $or: [
      { _id: req.query.state },
      {
        state: `${req.query.state.charAt(0).toUpperCase()}${req.query.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  });
  if (req.query.populate === "info") {
    Addresses.find({ country: Country._id, state: State._id })
      .populate("Countries", "_id", "country")
      .populate("States", "_id", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  Addresses.find({ country: Country._id, state: State._id })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.getAddress = (req, res, next) => {
  if (req.query.populate === "info") {
    Addresses.findOne({
      $or: [
        { _id: req.params.address },
        {
          state: `${req.params.address
            .charAt(0)
            .toUpperCase()}${req.params.address.slice(1).toLowerCase()}`,
        },
      ],
    })
      .populate("Countries", "_id", "country")
      .populate("States", "_id", "state")
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  }
  Addresses.findOne({
    $or: [
      { _id: req.params.address },
      {
        state: `${req.params.address
          .charAt(0)
          .toUpperCase()}${req.params.address.slice(1).toLowerCase()}`,
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
exports.updateAddress = async (req, res, next) => {
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
  const State = await Countries.findOne({
    $or: [
      { _id: req.body.state },
      {
        state: `${req.body.state.charAt(0).toUpperCase()}${req.body.state
          .slice(1)
          .toLowerCase()}`,
      },
    ],
  });
  await Addresses.findOne({
    $or: [
      { _id: req.params.address },
      {
        address: `${req.params.address
          .charAt(0)
          .toUpperCase()}${req.params.address.slice(1).toLowerCase()}`,
      },
    ],
  })
    .then(async (data) => {
      Addresses.updateOne(
        { _id: data._id },
        { ...req.body, country: Country._id, state: State._id }
      )
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
exports.deleteAddress = (req, res, next) => {
  Addresses.findOneAndDelete({
    $or: [
      { _id: req.params.address },
      {
        address: `${req.params.address
          .charAt(0)
          .toUpperCase()}${req.params.address.slice(1).toLowerCase()}`,
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
