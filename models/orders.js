const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrdersSchema = new Schema({
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["Cash On Delivery", "Credit Card"],
    required: true,
  },
  is_confirmed: {
    type: Boolean,
    default: false,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  is_delivered: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});
module.exports = mongoose.model("Orders", OrdersSchema);
