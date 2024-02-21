const { verifyToken } = require("../utils/token.util");
const { authTokenKey } = require("../config");
const { authTokenName } = require("../config");
module.exports.protect = (req, res, next) => {
  const token = req.cookies[authTokenName];
  if (token) {
    const userInfo = verifyToken(token, authTokenKey);
    if (userInfo) {
      req.userInfo = userInfo;
      next();
    } else res.status(401).end("You are not authorized");
  } else res.status(401).end("You are not authorized");
};
