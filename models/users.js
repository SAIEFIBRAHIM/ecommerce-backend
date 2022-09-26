const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email field is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
  first_name: {
    type: String,
    required: [true, "fist_name field is required"],
  },
  last_name: {
    type: String,
    required: [true, "last_name field is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
    required: [true, "gender field is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone field is required"],
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
    required: [true, "address field is required"],
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

module.exports = mongoose.model("User", UserSchema);
