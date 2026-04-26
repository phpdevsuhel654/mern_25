const Chat = require("../models/Chat");
const User = require("../models/User");

// Create or access one-to-one chat
exports.accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId required" });
  }

  let chat = await Chat.findOne({
    isGroup: false,
    users: { $all: [req.user._id, userId] },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chat) return res.json(chat);

  const newChat = await Chat.create({
    isGroup: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate(
    "users",
    "-password"
  );

  res.status(201).json(fullChat);
};

// Fetch all chats of logged-in user
exports.fetchChats = async (req, res) => {
  const chats = await Chat.find({
    users: { $in: [req.user._id] },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  res.json(chats);
};

// Create group chat
exports.createGroupChat = async (req, res) => {
  const { name, users } = req.body;

  if (!name || !users) {
    return res.status(400).json({ message: "All fields required" });
  }

  const parsedUsers = JSON.parse(users);

  if (parsedUsers.length < 2) {
    return res.status(400).json({ message: "Minimum 2 users required" });
  }

  parsedUsers.push(req.user);

  const groupChat = await Chat.create({
    name,
    isGroup: true,
    users: parsedUsers,
    admin: req.user._id,
  });

  const fullGroup = await Chat.findById(groupChat._id)
    .populate("users", "-password")
    .populate("admin", "-password");

  res.status(201).json(fullGroup);
};

// Rename group
exports.renameGroup = async (req, res) => {
  const { chatId, name } = req.body;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { name },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  res.json(chat);
};