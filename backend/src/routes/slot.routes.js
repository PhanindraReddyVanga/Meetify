const router = require("express").Router();
const controller = require("../controllers/slot.controller");

router.post("/", controller.createSlot);
router.get("/host/:hostId", controller.getSlotsByHost);

module.exports = router;
