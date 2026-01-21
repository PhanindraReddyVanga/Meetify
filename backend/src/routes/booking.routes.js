const router = require("express").Router();
const controller = require("../controllers/booking.controller");

router.post("/", controller.createBooking);
router.get("/user/:userId", controller.getUserBookings);

module.exports = router;
