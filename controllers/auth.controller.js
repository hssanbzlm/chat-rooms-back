const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");
const { signToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");

module.exports.join = async (req, res) => {
  if (!req.cookies[authTokenName]) {
    const { userName, roomCode } = req.body;
    const userDoc = await user.findOne({ userName });
    const roomDoc = await chatRoom.findOne({ roomCode });
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    if (userDoc && roomDoc) {
      const token = signToken({ userName, roomCode }, key);
      res.cookie(authTokenName, token, options);
      res.status(200).send("you joined a room successfully");
    } else res.status(404).send("error while joining a room");
  } else res.status(200).send("You are already inside a room");
};

module.exports.leave = (req, res) => {
  res.clearCookie(authTokenName);
  res.status(200).send("ok");
};
