const { authTokenKey, authTokenName } = require("../config");
const { verifyToken } = require("../utils/token.util");

module.exports = (socket, next) => {
  const cookie = socket.handshake.headers.cookie;
  if (cookie) {
    const authCookie = cookie
      .split(";")
      .find((v) => v.includes(`${authTokenName}=`));
    if (authCookie) {
      const authToken = authCookie.split(`${authTokenName}=`)[1];
      if (authToken) {
        const decodedToken = verifyToken(authToken, authTokenKey);
        if (decodedToken) {
          socket.data = decodedToken;
          next();
        } else {
          socket.disconnect();
          next(new Error("Invalid"));
        }
      } else {
        socket.disconnect();
        next(new Error("Invalid"));
      }
    } else {
      socket.disconnect();
      next(new Error("Invalid"));
    }
  } else {
    socket.disconnect();
    next(new Error("Invalid"));
  }
};
