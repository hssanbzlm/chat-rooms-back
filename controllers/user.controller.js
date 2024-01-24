const user = require("../models/user.model");

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
