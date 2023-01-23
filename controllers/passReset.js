const User = require("../models/users");
const jwt = require("jsonwebtoken");
const resetPassEmail = require("../config/resetpassemail");

exports.forgetPass = (req, res, next) => {
  User.findOne({
    email: req.query.email,
  })
    .then((data) => {
      const resetToken = jwt.sign(data.toJSON(), process.env.VERIFY_TOKEN_KEY, {
        expiresIn: 60 * 30,
      });
      User.findByIdAndUpdate(data._id, { pass_reset_token: resetToken }).then(
        (result) => {
          resetPassEmail(
            result.email,
            result.first_name,
            req.query.login,
            resetToken
          );
          return res.status(200).json({
            success: true,
            reset_token: resetToken,
            msg: "Password reset link sent to your email address",
          });
        }
      );
    })
    .catch((err) => {
      return res.status(404).json({ error: err });
    });
};
exports.resetPass = async (req, res, next) => {
  const resetVerify = jwt.verify(
    await req.query.reset_token,
    process.env.VERIFY_TOKEN_KEY
  );
  await User.findById(resetVerify._id)
    .then(async (data) => {
      if (resetVerify.exp * 1000 < Date.now()) {
        res
          .status(403)
          .json({ error: "Token expired request for password again" });
      } else if (req.query.reset_token === data.pass_reset_token) {
        return res.redirect(
          301,
          `${process.env.FRONT_END_URL}/account/reset/${data.pass_reset_token}`
        );
      } else {
        res
          .status(403)
          .json({ error: "Something went wrong try again please" });
      }
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};
exports.updateUserPass = async (req, res, next) => {
  const decodedUser = jwt.verify(
    await req.query.token,
    process.env.VERIFY_TOKEN_KEY
  );
  await User.findById(decodedUser._id)
    .then(async (data) => {
      data.password = req.body.password;
      data.updated_at = Date.now();
      data.pass_reset_token = undefined;
      await data
        .save()
        .then((result) => {
          return res.status(200).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};
