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

module.exports.isAdmin = async (req, res, next) => {
  const { userName, roomCode } = req.body;
  const userDoc = await user.findOne({ userName });
  const roomDoc = await chatRoom.findOne({ roomCode });
  if (userDoc && roomDoc) {
    if (userDoc._id.toString() == roomDoc.createdBy.toString()) {
      next();
    } else res.end("You are not an admin");
  } else res.end("you are not an admin");
};
