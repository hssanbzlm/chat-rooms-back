const { Server } = require("socket.io");
const { verifyToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");
module.exports = (server) => {
  const io = new Server(server);
  io.use((socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    if (cookie) {
      const authToken = cookie.split(`${authTokenName}=`)[1];
      const decodedToken = verifyToken(authToken, key);
      if (decodedToken) next();
      else next(new Error("Invalid"));
    } else {
      next(new Error("Invalid"));
    }
  });
  io.on("connection", async (socket) => {
    console.log(socket.id, "connected");
    const cookie = socket.handshake.headers.cookie;
    const authToken = cookie.split(`${authTokenName}=`)[1];
    const { roomCode, userName } = verifyToken(authToken, key);
    socket.join(roomCode);
    socket.on("send-message", (data) => {
      socket
        .to(roomCode)
        .emit("new-message", { message: data, user: userName });
    });
  });
};
