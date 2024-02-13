const user = require("../models/user.model");

module.exports.addUser = async (req, res) => {
  const { userName, fullName } = req.body;
  const doc = await user.create({ userName, fullName });
  if (doc) {
    res.status(200).send("user created successfully");
  } else {
    res.send(404).send("error whiled adding this user");
  }
};

module.exports.updateUser = async (req, res) => {
  const { userName } = req.userInfo;
  const { fullName } = req.body;
  const userDoc = await user.findOneAndUpdate(
    { userName },
    { avatar: req.avatar, fullName }
  );
  if (userDoc) res.status(200).send("User updated successfully");
  else res.status(400).send("Error while updating the user");
};
