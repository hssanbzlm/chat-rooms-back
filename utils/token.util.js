const jwt = require("jsonwebtoken");

module.exports.signToken = (data, key) => {
  const token = jwt.sign(data, key);
  return token;
};

module.exports.verifyToken = (token, key) => {
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    decoded = null;
  }
  return decoded;
};
