var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/users");
var auth = require("../middlewares/auth");
const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
  message:
    "Too many accounts created from this IP, please try again after 5 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const signupLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hours
  max: 20, // Limit each IP to 5 requests per `window` (here, per 12 hours)
  message:
    "Too many accounts created from this IP, please try again after 12 hours",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getUserId);
router.post("/signup", signupLimiter, userCtrl.addUser);
router.put("/:id", auth, userCtrl.updateUserId);
router.delete("/:id", auth, userCtrl.deleteUserId);
router.post("/login", loginLimiter, userCtrl.login);
router.post("/token", loginLimiter, userCtrl.token);

module.exports = router;
