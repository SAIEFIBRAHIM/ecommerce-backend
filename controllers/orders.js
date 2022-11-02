const Orders = require("../models/orders");
exports.addOrder = async (req, res, next) => {
  const orders = new Orders({ ...req.body });
  await orders
    .save()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getAllOrders = (req, res, next) => {
  Orders.find()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getOrder = (req, res, next) => {
  Orders.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.updateOrderDetails = (req, res, next) => {
  Orders.findByIdAndUpdate(req.params.id, { ...req.body })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.deleteOrder = (req, res, next) => {
  Orders.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).json({ deleted: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ deleted: false });
    });
};
