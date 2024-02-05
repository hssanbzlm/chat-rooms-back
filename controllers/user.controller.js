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
