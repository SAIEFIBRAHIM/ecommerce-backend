const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
  ],
  images: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Images",
    },
  ],
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
module.exports = mongoose.model("Products", ProductSchema);
