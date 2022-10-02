const User = require("../models/users");
const Address = require("../models/address");
const jwt = require("jsonwebtoken");
const jwtToken = require("../config/token");
exports.addUser = async (req, res, next) => {
  await Address.findOne({
    country: req.body.address.country,
    city: req.body.address.city,
    road: req.body.address.road,
  })
    .then((data) => {
      if (data) {
        var user = new User({ ...req.body, address: data._id });
        user
          .save()
          .then((result) => {
            return res.status(201).json({
              success: true,
              msg: "Successful created new User",
              data: result,
            });
          })
          .catch((error) => {
            console.error(error);
            return res.status(403).json({ err: error });
          });
      } else
        return res.status(403).json({ err: "Wrong Address", address: data });
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ err: err });
    });
};
exports.getUsers = (req, res, next) => {
  req.query.populate === "address"
    ? User.find()
        .populate("address")
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        })
    : User.find()
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        });
};
exports.getUserId = (req, res, next) => {
  req.query.populate === "address"
    ? User.findById(req.params.id)
        .populate("address")
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No User Found" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        })
    : User.findById(req.params.id)
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No User Found" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        });
};
exports.updateUserId = async (req, res, next) => {
  await Address.find({
    country: req.body.address.country,
    city: req.body.address.city,
    road: req.body.address.road,
  })
    .then((data) => {
      User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        address: data.address._id,
      })
        .then((result) => {
          return res.status(200).json({ success: true, data: result });
        })
        .catch((error) => {
          console.error(error);
          return res.status(404).json({ err: "No User Found" });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json({ err: "No User Found" });
    });
};
exports.deleteUserId = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.status(200).json({ delete: true, data: result });
    })

    .catch((err) => {
      console.error(err);
      return res.status(404).json({ err: "No User Found" });
    });
};
exports.login = (req, res, next) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwtToken(user);
            res.json({
              success: true,
              token: `JWT ${token}`,
              user: {
                username: user.username,
                email: user.email,
                _id: user._id,
              },
            });
          } else {
            console.log(err);
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
};
