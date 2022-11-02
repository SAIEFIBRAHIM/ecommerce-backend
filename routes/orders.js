var express = require("express");
var router = express.Router();
var ordersCtrl = require("../controllers/orders");
router.get("/", ordersCtrl.getAllOrders);
router.get("/:id", ordersCtrl.getOrder);
router.post("/", ordersCtrl.addOrder);
router.put("/:id", ordersCtrl.updateOrderDetails);
router.delete("/:id", ordersCtrl.deleteOrder);

module.exports = router;
