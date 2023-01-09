const countries = require("../models/countries");
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
  if (typeof req.params.country === String) {
    await countries
      .findOne({
        country: `${req.params.country
          .charAt(0)
          .toUpperCase()}${req.params.country.slice(1).toLowerCase()}`,
      })
      .then((data) => {
        console.log(typeof req.params.country);

        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        console.log(typeof req.params.country);
        console.log(error);
        return res.status(400).json({ success: false, error: error });
      });
  } else {
    await Countries.findById(req.params.country)
      .then((data) => {
        console.log(req.params.country);
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        console.log(req.params.country);
        console.log(error);
        return res.status(400).json({ success: false, error: error });
      });
  }
};
exports.updateCountry = (req, res, next) => {
  Countries.findOneAndUpdate(
    {
      $or: [
        { _id: req.params.country },
        {
          country: `${req.params.country
            .charAt(0)
            .toUpperCase()}${req.params.country.slice(1).toLowerCase()}`,
        },
      ],
    },
    { ...req.body }
  )
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};
exports.deleteCountry = (req, res, next) => {
  Countries.findOneAndDelete({
    $or: [
      { _id: req.params.country },
      {
        country: `${req.params.country
          .charAt(0)
          .toUpperCase()}${req.params.country.slice(1).toLowerCase()}`,
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
