const mongoose = require("mongoose");

const meetifyHostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  role: { type: String, enum: ["creator", "expert", "event"], required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("MeetifyHost", meetifyHostSchema);
