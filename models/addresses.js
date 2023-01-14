const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressesSchema = new Schema({
  country: {
    type: mongoose.Types.ObjectId,
    ref: "Countries",
    required: [true, "country field is required"],
  },
  state: {
    type: mongoose.Types.ObjectId,
    ref: "States",
    required: [true, "state field is required"],
  },
  address: {
    type: String,
    required: [true, "road field is required"],
  },
  address_ar: {
    type: String,
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
module.exports = mongoose.model("Addresses", AddressesSchema);
