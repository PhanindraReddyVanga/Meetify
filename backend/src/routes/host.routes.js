const router = require("express").Router();
const controller = require("../controllers/host.controller");

router.post("/register", controller.registerHost);
router.get("/:id", controller.getHost);

module.exports = router;
