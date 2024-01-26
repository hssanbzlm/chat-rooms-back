const { Server } = require("socket.io");
const { verifyToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");
const { saveMessage } = require("../controllers/message.controller");
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
  io.on("connection", (socket) => {
    const cookie = socket.handshake.headers.cookie;
    const authToken = cookie.split(`${authTokenName}=`)[1];
    const { roomCode, userName } = verifyToken(authToken, key);
    socket.join(roomCode);
    socket
      .to(roomCode)
      .emit("user-join", { data: `User ${userName} joined the chat` });
    socket.on("send-message", async (data) => {
      const saved = await saveMessage({
        userName,
        roomCode,
        content: data,
      }).catch((err) => console.log(err));
      if (saved) {
        socket
          .to(roomCode)
          .emit("new-message", { message: data, user: userName });
      }
    });

    socket.on("disconnect", (reason) => {
      socket
        .to(roomCode)
        .emit("user-leave", { data: `User ${userName} left the chat` });
    });
  });
};
