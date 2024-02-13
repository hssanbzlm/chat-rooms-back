const user = require("../models/user.model");
const { signToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");
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
  const { avatar } = req;
  const updateFields = {
    ...(avatar && { avatar }),
    ...(fullName && { fullName }),
  };
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };
  const userDoc = await user.findOneAndUpdate({ userName }, updateFields, {
    new: true,
  });
  if (userDoc) {
    const token = signToken(
      {
        ...req.userInfo,
        ...updateFields,
      },
      key
    );
    res.clearCookie(authTokenName);
    res.cookie(authTokenName, token, options);
    res.status(200).json(userDoc);
  } else res.status(400).send("Error while updating the user");
};
