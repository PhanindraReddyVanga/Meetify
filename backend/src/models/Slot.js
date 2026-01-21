const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "MeetifyHost", required: true },
  title: String,
  description: String,
  price: Number,
  duration: Number,
  startTime: Date,
  endTime: Date,
  isBooked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Slot", slotSchema);
