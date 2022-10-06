const User = require("../models/users");
const Address = require("../models/address");
const jwt = require("jsonwebtoken");
const tokenList = {};
const cookieParser = require("cookie-parser");

exports.addUser = async (req, res, next) => {
  //! add account verification
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
      }
      // create address, then create user with the id of created address
      else return res.status(403).json({ err: "Wrong Address", address: data });
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
        address: data._id,
      })
        .then((result) => {
          return res.status(200).json({ success: true, data: result });
        })
        .catch((error) => {
          console.error(error);
          return res.status(404).json({ err: error });
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
    { $or: [{ username: req.body.login }, { email: req.body.login }] },
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
            res.cookie("username", user.username, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            const response = {
              status: "Logged in",
              token: token,
              refreshToken: refreshToken,
              user: {
                username: user.username,
                _id: user._id,
              },
            };
            tokenList[refreshToken] = response;
            res.status(200).json(response);
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
exports.token = (req, res, next) => {
  if (req.cookies.refreshToken && req.cookies.refreshToken in tokenList) {
    User.findOne(
      {
        username: req.cookies.username,
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
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 30,
          });
          tokenList[req.cookies.refreshToken].token = token;
          res.status(200).json({ token: token });
        }
      }
    );
  } else {
    res.status(404).send("Invalid request");
  }
};
