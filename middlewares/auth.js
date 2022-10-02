const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

module.exports = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).send("Unauthorized access");
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
    req.decoded = decoded;
    console.log(decoded);
  } catch (err) {
    console.log(err);
    return res.status(403).send("Invalid Token");
  }
  return next();
};
