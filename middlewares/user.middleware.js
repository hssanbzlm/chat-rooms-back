const user = require("../models/user.model");
const chatRoom = require("../models/chat-room.model");
module.exports.checkUserExist = async (req, res, next) => {
  const { userName } = req.body;
  const doc = await user.findOne({ userName });
  if (doc) {
    res.status(200).send("user exist");
  } else {
    next();
  }
};
