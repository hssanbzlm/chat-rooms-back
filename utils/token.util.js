const jwt = require("jsonwebtoken");

module.exports.signToken = (data, key) => {
  const token = jwt.sign(data, key);
  return token;
};

module.exports.verifyToken = (token, key) => {
  const decoded = jwt.verify(token, key);
  return decoded;
};
