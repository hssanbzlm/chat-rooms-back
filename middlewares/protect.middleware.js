const { verifyToken } = require("../utils/token.util");
const { key } = require("../config");
module.exports.protect = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (token) {
    const userInfo = verifyToken(token, key);
    if (userInfo) {
      req.userInfo = userInfo;
      next();
    } else res.end("You are not authorized");
  } else res.end("You are not authorized");
};
