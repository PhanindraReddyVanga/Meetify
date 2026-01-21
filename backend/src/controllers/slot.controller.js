const Slot = require("../models/Slot");

exports.createSlot = async (req, res) => {
  try {
    const slot = await Slot.create(req.body);
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSlotsByHost = async (req, res) => {
  try {
    const slots = await Slot.find({ hostId: req.params.hostId });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
