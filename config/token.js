const jwt = require("jsonwebtoken");
module.exports = (user) =>
  jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
    expiresIn: "10d",
  });
