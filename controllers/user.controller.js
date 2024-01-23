const chatRoom = require("../models/chat-room.model");
const user = require("../models/user.model");
const key = require("../config/index").key;
const { signToken } = require("../utils/token.util");

module.exports.handleExist = (req, res) => {
  if (req.existence) res.status(200).send("user exist");
  else res.status(404).send("user does not exist");
};
module.exports.addUser = async (req, res) => {
  if (!req.existence) {
    const { userName, fullName } = req.body;
    const doc = await user.create({ userName, fullName });
    if (doc) {
      res.status(200).send("user created successfully");
    } else {
      res.send(404).send("error whiled adding this user");
    }
  } else res.status(200).send("User already exist");
};

module.exports.join = async (req, res) => {
  const { userName, roomCode } = req.body;
  const userDoc = await user.findOne(userName);
  const roomDoc = await chatRoom.findOne({ roomCode });
  const options = {
    httpOnly: true,
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
