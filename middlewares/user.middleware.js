const chatRoom = require("../models/chat-room.model");
const user = require("../models/user.model");
module.exports.checkUserExist = async (req, res, next) => {
  const { userName } = req.body;
  const doc = await user.findOne({ userName });
  if (doc) {
    req.existence = true;
  } else {
    req.existence = false;
  }
  next();
};

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
module.exports.isAdmin = async (req, res, next) => {
  const { userName, roomCode } = req.body;
  const userDoc = await user.findOne({ userName });
  const roomDoc = await chatRoom.findOne({ roomCode });
  if (userDoc && roomDoc) {
    if (userDoc._id.toString() == roomDoc.createdBy.toString()) {
      next();
    } else res.status(403).send("You are not admin");
  } else res.status(404).send("Error");
};
