const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.createOrGetConversation = async (userId, otherUserId) => {
  let convo = await Conversation.findOne({
    participants: { $all: [userId, otherUserId] }
  });

  if (!convo) {
    convo = await Conversation.create({
      participants: [userId, otherUserId]
    });
  }

  return convo;
};

exports.sendMessage = async (conversationId, senderId, content) => {
  const message = await Message.create({
    conversationId,
    senderId,
    content
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: content
  });

  return message;
};

exports.getMessages = async (conversationId) => {
  return await Message.find({ conversationId }).sort({ createdAt: 1 });
};
