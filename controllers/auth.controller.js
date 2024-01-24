const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");
const { signToken } = require("../utils/token.util");
const { key } = require("../config");

module.exports.join = async (req, res) => {
  const { userName, roomCode } = req.body;
  const userDoc = await user.findOne({ userName });
  const roomDoc = await chatRoom.findOne({ roomCode });
  const options = {
    httpOnly: true,
    secure: true,
  };
  if (userDoc && roomDoc) {
    const token = signToken({ userName, roomCode }, key);
    res.cookie("auth-token", token, options);
    res.status(200).send("you joined a room successfully");
  } else res.status(404).send("error while joining a room");
};

module.exports.leave = async (req, res) => {
  res.clearCookie("auth-token");
  res.send("ok");
};
