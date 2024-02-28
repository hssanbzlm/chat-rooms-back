const chatRoom = require("../models/chat-room.model");
const user = require("../models/user.model");
const uuid = require("uuid");
const { authTokenName, xsrfTokenName } = require("../config");
module.exports.createRoom = async (req, res) => {
  const { roomName, userName } = req.body;
  const roomCode = uuid.v4();
  const createdBy = await user.findOne({ userName });
  if (createdBy && roomCode) {
    const doc = await chatRoom.create({ roomName, roomCode, createdBy });
    if (doc) res.status(201).send(roomCode);
    else res.status(404).send("Error creating a room");
  } else res.status(404).send("Error creating a room");
};

module.exports.deleteRoom = async (req, res) => {
  const { roomCode, isAdmin } = req.userInfo;
  if (isAdmin) {
    const doc = await chatRoom.findOneAndDelete({ roomCode });
    if (doc) {
      res.clearCookie(authTokenName);
      res.clearCookie(xsrfTokenName);
      res.status(200).send("Room removed successfully");
    } else res.status(404).send("Error removing this room");
  } else res.status(403).send("You are not allowed");
};
