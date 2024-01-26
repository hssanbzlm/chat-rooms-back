const message = require("../models/message.model");
const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");

module.exports.saveMessage = async ({ userName, roomCode, content }) => {
  try {
    const userDoc = await user.findOne({ userName });
    const chatRoomDoc = await chatRoom.findOne({ roomCode });
    if (userDoc && chatRoomDoc) {
      const sender = userDoc._id;
      const receiver = chatRoomDoc._id;
      const date = new Date();
      const messageDoc = await message.create({
        content,
        date,
        sender,
        receiver,
      });
      if (messageDoc) return Promise.resolve(messageDoc);
      return Promise.reject("Error saving message");
    } else return Promise.reject("Error saving message");
  } catch (err) {
    return Promise.reject(err);
  }
};
