const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CountriesSchema = new Schema({
  country: {
    type: String,
    required: [true, "Country name field is required"],
  },
  country_ar: {
    type: String,
  },
  phone_prefix: {
    type: Number,
    required: [true, "Phone prefix field is required"],
  },
  currency_name: {
    type: String,
    required: [true, "Country currency field is required"],
  },
  currency_symbol: {
    type: String,
    required: [true, "Country symbol field is required"],
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
module.exports = mongoose.model("Countries", CountriesSchema);
