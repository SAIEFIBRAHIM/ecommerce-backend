const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
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
module.exports = mongoose.model("Categories", CategoriesSchema);
