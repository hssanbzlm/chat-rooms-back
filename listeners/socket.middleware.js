const { key, authTokenName } = require("../config");
const { verifyToken } = require("../utils/token.util");

module.exports = (socket, next) => {
  const cookie = socket.handshake.headers.cookie;
  if (cookie) {
    const authToken = cookie.split(`${authTokenName}=`)[1];
    const decodedToken = verifyToken(authToken, key);
    if (decodedToken) {
      socket.data = decodedToken;
      next();
    } else next(new Error("Invalid"));
  } else {
    next(new Error("Invalid"));
  }
};
