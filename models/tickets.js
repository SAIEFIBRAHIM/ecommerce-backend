const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketsSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  images: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Images",
    },
  ],
  messages: {
    type: String,
    required: true,
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
module.exports = mongoose.model("Tickets", TicketsSchema);
