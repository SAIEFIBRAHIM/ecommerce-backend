const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatesSchema = new Schema({
  country: {
    type: mongoose.Types.ObjectId,
    ref: "Countries",
    required: [true, "Country id field is required"],
  },
  state: {
    type: String,
    required: [true, "State name field is required"],
  },
  state_ar: {
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
module.exports = mongoose.model("States", StatesSchema);
