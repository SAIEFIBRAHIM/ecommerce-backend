const User = require("../models/users");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../config/verifyemail");

exports.requestVerify = async (req, res, next) => {
  const token = await req.headers.authorization.split(" ")[1];
  const decodedUser = jwt.verify(await token, process.env.TOKEN_KEY);
  await User.findById(decodedUser._id)
    .then(async (found) => {
      if (found.verified) {
        return res.status(200).json({ success: true, verifed: true });
      } else {
        const verifyToken = jwt.sign(
          found.toJSON(),
          process.env.VERIFY_TOKEN_KEY,
          {
            expiresIn: 60 * 30,
          }
        );
        await User.findByIdAndUpdate(decodedUser._id, {
          verify_token: verifyToken,
        })
          .then(async (data) => {
            await verifyEmail(
              data.email,
              data.first_name,
              data.last_name,
              verifyToken
            );
            return res.status(200).json({
              success: true,
              msg: "Verification link sent to your email",
            });
          })
          .catch((error) => {
            res.status(400).json({ success: false, error: error });
          });
      }
    })
    .catch((error) => {
      console.log(error, req.headers.authorization.split(" ")[1]);
      res.status(400).json({ success: false, error: error });
    });
};
exports.verifyUser = async (req, res, next) => {
  const userVerification = jwt.verify(
    req.query.verify_token,
    process.env.VERIFY_TOKEN_KEY
  );
  if (userVerification.verified) {
    return res.status(200).json({ success: true, verified: true });
  }
  await User.findOne({ email: req.query.email })
    .then(async (found) => {
      if (userVerification.exp * 1000 < Date.now()) {
        return res.status(400).json({
          success: false,
          verified: false,
          msg: "Request verification again",
        });
      } else if (req.query.verify_token === found.verify_token) {
        found.verified = true;
        found.verify_token = undefined;
        await found
          .save()
          .then(() => {
            return res.status(200).json({ success: true, verified: true });
          })
          .catch((err) => {
            console.log(err, "Unexpected error please try again later");
            return res.status(404).json({ error: err });
          });
      } else {
        return res
          .status(400)
          .json({ msg: "Something went wrong try again later please" });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};
