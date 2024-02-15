const message = require("../models/message.model");
const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");

module.exports.saveMessage = async ({ userName, roomCode, content, date }) => {
  try {
    const userDoc = await user.findOne({ userName });
    const chatRoomDoc = await chatRoom.findOne({ roomCode });
    if (userDoc && chatRoomDoc) {
      const sender = userDoc._id;
      const receiver = chatRoomDoc._id;
      const messageDoc = await message.create({
        content,
        date,
        sender,
        receiver,
      });
      if (messageDoc)
        return Promise.resolve({
          _id: messageDoc._id,
          content,
          date,
          sender: {
            userName: userDoc.userName,
            fullName: userDoc.fullName,
          },
          receiver,
        });
      return Promise.reject("Error saving message");
    } else return Promise.reject("Error saving message");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.getMessages = async (req, res) => {
  const { roomCode, userName } = req.userInfo;
  const list = req.params["list"];
  const msgToSkip = +req.query.skip;
  const limit = 20;
  const skip = list * limit - limit + msgToSkip;
  const room = await chatRoom.findOne({ roomCode });
  const messages = await message
    .aggregate([
      { $match: { receiver: { $eq: room._id } } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $project: {
          content: 1,
          date: 1,
          _id: 1,
          sender: { $arrayElemAt: ["$sender", 0] },
          receiver: 1,
        },
      },
    ])
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .sort({ date: 1 });
  const result = { messages, lastList: messages.length < limit };

  res.status(200).send(result);
};
