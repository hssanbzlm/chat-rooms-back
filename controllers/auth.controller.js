const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");
const { signToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");

module.exports.getUserInfo = (req, res) => {
  const { userName, fullName, isAdmin, avatar } = req.userInfo;
  res.status(200).json({ userName, fullName, isAdmin, avatar });
};

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
      const isAdmin = userDoc._id.toString() == roomDoc.createdBy.toString();
      const token = signToken(
        {
          _id: userDoc._id,
          userName,
          fullName: userDoc.fullName,
          roomCode,
          isAdmin,
          avatar: userDoc.avatar,
        },
        key
      );
      res.cookie(authTokenName, token, options);
      res.status(200).json({
        userName,
        fullName: userDoc.fullName,
        isAdmin,
        avatar: userDoc.avatar,
      });
    } else res.status(404).send("error while joining a room");
  } else res.status(200).send("You are already inside a room");
};

module.exports.leave = (req, res) => {
  res.clearCookie(authTokenName);
  res.status(200).send("ok");
};
