const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductImgSchema = new Schema({
  name: {
    type: String,
    required: [true, "File name is required"],
  },
  file_url: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
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
module.exports = mongoose.model("ProductImg", ProductImgSchema);
