const Message = require("../models/Message");
const Chat = require("../models/Chat");

// Send message
exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
    readBy: [req.user._id],
  });

  message = await message.populate("sender", "name email");
  message = await message.populate({
    path: "chat",
    populate: { path: "users", select: "name email" },
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message._id,
  });

  // 🔥 Emit via Socket (IMPORTANT)
  const io = req.app.get("io");
  io.to(chatId).emit("message_received", message);

  res.status(201).json(message);
};

// Fetch messages of a chat
exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  })
    .populate("sender", "name email")
    .populate("chat");

  res.json(messages);
};