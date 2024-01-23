const message = require("../models/message.model");
const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");

module.exports.saveMessage = async (req, res) => {
  const { userName, roomCode, content } = req.body;
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
    if (messageDoc) {
      res.status(200).send("message saved");
    } else res.status(404).send("error while saving the message");
  } else {
    res.status(404).send("username or room not found");
  }
};
