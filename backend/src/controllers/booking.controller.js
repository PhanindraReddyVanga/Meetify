const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    await Slot.findByIdAndUpdate(req.body.slotId, { isBooked: true });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
