const express = require("express");
const router = express.Router();
const controller = require("./meetify.controller");
const authMiddleware = require("../middleware/auth.middleware"); // use your existing JWT middleware

router.post("/conversation", authMiddleware, controller.createConversation);
router.post("/message", authMiddleware, controller.sendMessage);
router.get("/message/:conversationId", authMiddleware, controller.getMessages);

module.exports = router;
