const express = require("express");
const router = express.Router();

const controller = require("../controllers/payment.controller");

// normal route
router.post("/create-session", controller.createCheckoutSession);

// webhook route (needs raw body)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  controller.stripeWebhook
);

module.exports = router;
