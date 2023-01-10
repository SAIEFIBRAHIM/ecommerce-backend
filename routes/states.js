var express = require("express");
var router = express.Router();
var statesCtrl = require("../controllers/states");
var auth = require("../middlewares/auth");
router.get("/", statesCtrl.getStates);
router.get("/:id", statesCtrl.getState);
router.get("/", statesCtrl.getStatesByCountry);
router.post("/", auth, statesCtrl.addState);
router.post("/bulk", auth, statesCtrl.addStates);
router.put("/:id", auth, statesCtrl.updateState);
router.delete("/:id", auth, statesCtrl.deleteState);

module.exports = router;
