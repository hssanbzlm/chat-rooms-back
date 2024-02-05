const chatRoom = require("../models/chat-room.model");
const user = require("../models/user.model");
const uuid = require("uuid");
module.exports.createRoom = async (req, res) => {
  const { roomName, userName } = req.body;
  const roomCode = uuid.v4();
  const createdBy = await user.findOne({ userName });
  if (createdBy && roomCode) {
    const doc = await chatRoom.create({ roomName, roomCode, createdBy });
    if (doc) res.status(200).send(roomCode);
    else res.status(404).send("Error creating a room");
  } else res.status(404).send("Error creating a room");
};

module.exports.DeleteRoom = async (req, res) => {
  const { roomCode } = req.userInfo;
  const doc = await chatRoom.findOneAndDelete({ roomCode });
  if (doc) res.status(200).send("Room successfully removed");
  else res.status(404).send("Error removing this room");
};
