const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const hostRoutes = require("./routes/host.routes");
const slotRoutes = require("./routes/slot.routes");
const bookingRoutes = require("./routes/booking.routes");
const paymentRoutes = require("./routes/payment.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

connectDB();

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/api/meetify/payments/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.use("/api/meetify/host", hostRoutes);
app.use("/api/meetify/slots", slotRoutes);
app.use("/api/meetify/bookings", bookingRoutes);
app.use("/api/meetify/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Meetify API running");
});

module.exports = app;
