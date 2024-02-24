const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");
const { signToken } = require("../utils/token.util");
const { authTokenKey, authTokenName } = require("../config");
const { options } = require("../utils/cookie.util");

module.exports.getUserInfo = (req, res) => {
  const { userName, fullName, isAdmin, avatar, belongsTo, userId } =
    req.userInfo;
  res
    .status(200)
    .json({ userName, userId, fullName, belongsTo, isAdmin, avatar });
};

module.exports.join = async (req, res) => {
  if (!req.cookies[authTokenName]) {
    const { userName, roomCode } = req.body;
    const userDoc = await user.findOne({ userName });
    const roomDoc = await chatRoom.findOne({ roomCode });
    if (userDoc && roomDoc) {
      const isAdmin = userDoc._id.toString() == roomDoc.createdBy.toString();
      const token = signToken(
        {
          userId: userDoc._id,
          userName,
          fullName: userDoc.fullName,
          roomCode,
          roomId: roomDoc._id,
          belongsTo: roomDoc.roomName,
          isAdmin,
          avatar: userDoc.avatar,
        },
        authTokenKey
      );
      res.cookie(authTokenName, token, options);
      res.status(200).json({
        userId: userDoc._id,
        userName,
        fullName: userDoc.fullName,
        belongsTo: roomDoc.roomName,
        isAdmin,
        avatar: userDoc.avatar,
      });
    } else res.status(404).send("error while joining a room");
  } else res.status(200).send("You are already inside a room");
};

module.exports.leave = (req, res) => {
  res.clearCookie(authTokenName, options);
  res.status(200).send("ok");
};
