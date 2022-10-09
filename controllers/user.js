const User = require("../models/users");
const Address = require("../models/address");
const jwt = require("jsonwebtoken");
const tokenList = {};
const verifyEmail = require("../config/verifyemail");
exports.addUser = async (req, res, next) => {
  await Address.findOne({
    country: req.body.address.country,
    city: req.body.address.city,
    road: req.body.address.road,
  })
    .then(async (data) => {
      if (data) {
        var user = new User({ ...req.body, address: data._id });
        user
          .save()
          .then(async (result) => {
            const verifyToken = jwt.sign(
              result.toJSON(),
              process.env.VERIFY_TOKEN_KEY,
              {
                expiresIn: 60 * 30,
              }
            );
            await User.findByIdAndUpdate(result._id, {
              verify_token: verifyToken,
            });
            await verifyEmail(
              result.email,
              result.first_name,
              result.username,
              verifyToken
            );
            return res.status(201).json({
              success: true,
              msg: "Successful created new User",
              hint: "verification link sent to your email",
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
exports.updateUserId = (req, res, next) => {
  const { country, city, road } = req.body.address;
  Address.find({
    country: country,
    city: city,
    road: road,
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
  if (req.body.refreshToken && req.body.refreshToken in tokenList) {
    const userVerification = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    User.findOne(
      {
        username: userVerification.username,
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
exports.requestVerify = async (req, res, next) => {
  const token = await req.headers.authorization.split(" ")[1];
  const decodedUser = jwt.verify(await token, process.env.TOKEN_KEY);
  User.findById(decodedUser._id).then(async (found) => {
    const verifyToken = jwt.sign(found.toJSON(), process.env.VERIFY_TOKEN_KEY, {
      expiresIn: 60 * 30,
    });
    await User.findByIdAndUpdate(decodedUser._id, { verify_token: verifyToken })
      .then(async (data) => {
        await verifyEmail(
          data.email,
          data.first_name,
          data.username,
          verifyToken
        );
        return res.status(200).json({
          success: true,
          hint: "verification link sent to your email",
          token: verifyToken,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.verifyUser = async (req, res, next) => {
  const userVerification = jwt.verify(
    req.query.token,
    process.env.VERIFY_TOKEN_KEY
  );
  if (userVerification.verified) {
    return res.status(200).json({ msg: "Already verified" });
  }
  await User.findOne({ username: req.query.username }).then((found) => {
    if (
      userVerification.exp * 1000 > Date.now() &&
      req.query.token === found.verify_token
    ) {
      console.log(userVerification.exp * 1000, Date.now(), "error here");
      User.findByIdAndUpdate(
        {
          _id: userVerification._id,
        },
        { verified: true, verify_token: "" }
      )
        .then((data) => {
          console.log("User Verified");
          return res.status(200).json({ success: true, data: data });
        })

        .catch((err) => {
          console.error(err);
          return res.status(404).json({ err: "No User Found" });
        });
    } else if (found.verify_token === "") {
      return res.status(200).json({ msg: "Already verified" });
    } else return res.status(404).json({ err: "Verification token Time Out" });
  });
};
exports.forgetPass = (req, res, next) => {
  User.findOne({
    $or: [{ username: req.params.login }, { email: req.params.login }],
  })
    .then((data) => {
      verifyEmail(data.email, data.first_name);
      return res.status(200).json({
        success: true,
        msg: "Password reset link sent to your email address",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
exports.resetPass = (req, res, next) => {
  User.findOne({
    $or: [{ username: req.params.login }, { email: req.params.login }],
  })
    .then((data) => {
      verifyEmail(data.email, data.first_name);
      return res.status(200).json({
        success: true,
        msg: "Password reset link sent to your email address",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err: err });
    });
};
