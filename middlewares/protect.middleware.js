const { verifyToken } = require("../utils/token.util");
const { authTokenKey } = require("../config");
const { authTokenName, xsrfSecret } = require("../config");
module.exports.protect = (req, res, next) => {
  const authToken = req.cookies[authTokenName];
  const csrfToken = req.headers["x-xsrf-token"];
  if (authToken && csrfToken) {
    const isCsrfToken = verifyToken(csrfToken, xsrfSecret);
    const userInfo = verifyToken(authToken, authTokenKey);
    if (userInfo && isCsrfToken) {
      req.userInfo = userInfo;
      next();
    } else res.status(401).end("You are not authorized");
  } else res.status(401).end("You are not authorized");
};
