const meetifyService = require("./meetify.service");

exports.createConversation = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const convo = await meetifyService.createOrGetConversation(
      req.user.id,
      otherUserId
    );
    res.json(convo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const message = await meetifyService.sendMessage(
      conversationId,
      req.user.id,
      content
    );
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await meetifyService.getMessages(req.params.conversationId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
