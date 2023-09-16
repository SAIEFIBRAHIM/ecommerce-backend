const User = require("../models/users");
const jwt = require("jsonwebtoken");
const tokenList = [];
const verifyEmail = require("../config/verifyemail");
const States = require("../models/states");
const Countries = require("../models/countries");
const Addresses = require("../models/addresses");
exports.addUser = async (req, res, next) => {
  const verifyToken = jwt.sign(req.body, process.env.VERIFY_TOKEN_KEY, {
    expiresIn: 60 * 30,
  });
  const country = await Countries.findOne({ country: req.body.country });

  const state = await States.findOne({ state: req.body.state });

  const address = await Addresses.findOne({ address: req.body.address });

  const user = new User({
    ...req.body,
    country: country._id,
    state: state._id,
    address: address._id,
    verify_token: verifyToken,
  });
  await user
    .save()
    .then((found) => {
      verifyEmail(found.email, found.first_name, found.last_name, verifyToken);
      return res.status(201).json({
        success: true,
        msg: "Successful created new User",
        hint: "verification link sent to your email",
        data: found,
      });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
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
          return res.status(403).json({ error: err });
        })
    : User.find()
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((err) => {
          return res.status(403).json({ error: err });
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
          return res.status(403).json({ error: err });
        })
    : User.findById(req.params.id)
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No User Found" });
        })
        .catch((err) => {
          return res.status(403).json({ error: err });
        });
};
exports.updateUserId = async (req, res, next) => {
  const country = await Countries.findOne({ country: req.body.country });

  const state = await States.findOne({ state: req.body.state });

  const address = await Addresses.findOne({ address: req.body.address });

  User.findByIdAndUpdate(req.params.id, {
    ...req.body,
    country: country._id,
    state: state._id,
    address: address._id,
  })
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};

exports.deleteUserId = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ deleted: true, data: data });
    })

    .catch((err) => {
      return res.status(404).json({ error: err, msg: "No User Found" });
    });
};
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400).send({
        success: false,
        msg: "User not found",
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_LIFE,
          });

          const refreshToken = jwt.sign(
            user.toJSON(),
            process.env.REFRESH_TOKEN_KEY,
            {
              expiresIn: process.env.REFRESH_TOKEN_LIFE,
            }
          );
          const response = {
            success: true,
            token: token,
            refreshToken: refreshToken,
            user: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              _id: user._id,
            },
          };
          tokenList[refreshToken] = response;
          res.status(200).json(response);
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  });
};
exports.token = (req, res, next) => {
  if (req.body.refreshToken && req.body.refreshToken in tokenList) {
    const userVerification = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    User.findOne(
      {
        email: userVerification.email,
      },
      (err, user) => {
        if (err) throw err;
        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found.",
          });
        } else {
          const token = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_LIFE,
          });
          tokenList[req.body.refreshToken].token = token;
          res.status(200).json({ token: token });
        }
      }
    );
  } else {
    res.status(404).send("Invalid request");
  }
};
