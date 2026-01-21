const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  userId: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  },

  stripeSessionId: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
