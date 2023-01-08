var express = require("express");
var router = express.Router();
var statesCtrl = require("../controllers/states");
var auth = require("../middlewares/auth");
router.get("/", statesCtrl.getStates);
router.get("/:state", statesCtrl.getState);
router.get("/", statesCtrl.getStatesByCountry);
router.post("/", auth, statesCtrl.addState);
router.post("/bulk", auth, statesCtrl.addStates);
router.put("/:state", auth, statesCtrl.updateState);
router.delete("/:state", auth, statesCtrl.deleteState);

module.exports = router;
