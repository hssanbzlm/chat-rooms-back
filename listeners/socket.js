const { Server } = require("socket.io");
const { verifyToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");
const { saveMessage } = require("../controllers/message.controller");
const envConfig = require("../config");
module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: envConfig.originUrl,
      credentials: true,
    },
  });
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
    const { _id, userName, fullName, roomCode } = verifyToken(authToken, key);
    socket.join(roomCode);
    socket
      .to(roomCode)
      .emit("user-join", { _id, userName, fullName, roomCode });
    socket.on("send-message", async (data) => {
      const savedMessage = await saveMessage({
        userName,
        roomCode,
        content: data,
      }).catch((err) => console.log(err));
      if (savedMessage) {
        socket.to(roomCode).emit("new-message", {
          ...savedMessage,
          isMyMessage: false,
        });
        socket.emit("my-new-message", { ...savedMessage, isMyMessage: true });
      }
    });

    socket.on("disconnect", (reason) => {
      socket
        .to(roomCode)
        .emit("user-leave", { data: `User ${userName} left the chat` });
    });
  });
};
