const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvoiceSchema = new Schema({
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  amount: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Invoice", InvoiceSchema);
