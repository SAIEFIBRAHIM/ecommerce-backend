const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompaniesSchema = new Schema({
  company_name: {
    type: String,
    required: [true, "company_name is required"],
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
module.exports = mongoose.model("Companies", CompaniesSchema);
