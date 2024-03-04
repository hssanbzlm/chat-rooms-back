const { authTokenKey, authTokenName } = require("../config");
const { verifyToken } = require("../utils/token.util");

module.exports = (socket, next) => {
  const cookie = socket.handshake.headers.cookie;
  if (cookie) {
    const authToken = cookie
      .split(";")
      .find((v) => v.includes(`${authTokenName}=`))
      ?.split(`${authTokenName}=`)[1];
    const userInfo = authToken
      ? verifyToken(authToken, authTokenKey)
      : undefined;
    if (userInfo) {
      socket.data = userInfo;
      next();
    } else {
      socket.disconnect();
      next(new Error("Invalid"));
    }
  } else {
    socket.disconnect();
    next(new Error("Invalid"));
  }
};
