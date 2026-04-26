const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

// 🔥 SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Setup user
  socket.on("setup", (userData) => {
    socket.join(userData._id); // personal room
    socket.emit("connected");
  });

  // ✅ Join chat room
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log("Joined chat:", chatId);
  });

  // ✅ Typing
  socket.on("typing", (chatId) => {
    socket.to(chatId).emit("typing");
  });

  socket.on("stop_typing", (chatId) => {
    socket.to(chatId).emit("stop_typing");
  });

  // ✅ Send message
  socket.on("new_message", (message) => {
    const chat = message.chat;

    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id == message.sender._id) return;

      socket.to(user._id).emit("message_received", message);
    });
  });

  // ✅ Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});