const mongoose = require("mongoose");
const messageShema = require("./message.model");

const chatRoomSchema = new mongoose.Schema({
  roomName: String,
  roomCode: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

chatRoomSchema.post("findOneAndDelete", async (doc) => {
  if (doc._id) {
    const roomId = doc._id;
    await messageShema.deleteMany({ receiver: roomId });
  }
});

module.exports = mongoose.model("chat-room", chatRoomSchema);
