const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
  country: {
    type: String,
    required: [true, "country field is required"],
  },
  city: {
    type: String,
    required: [true, "city field is required"],
  },
  road: {
    type: String,
    required: [true, "road field is required"],
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
module.exports = mongoose.model("Address", AddressSchema);
