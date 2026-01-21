const MeetifyHost = require("../models/MeetifyHost");

exports.registerHost = async (req, res) => {
  try {
    const host = await MeetifyHost.create(req.body);
    res.status(201).json(host);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHost = async (req, res) => {
  try {
    const host = await MeetifyHost.findById(req.params.id);
    res.json(host);
  } catch (err) {
    res.status(404).json({ error: "Host not found" });
  }
};
