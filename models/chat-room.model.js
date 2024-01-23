const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  roomName: String,
  roomCode: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("chat-room", chatRoomSchema);
