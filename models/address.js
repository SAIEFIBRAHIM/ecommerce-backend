const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
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
});
module.exports = mongoose.model("Address", AddressSchema);
