const { Server } = require("socket.io");
const { verifyToken } = require("../utils/token.util");
const { key, authTokenName } = require("../config");
const { saveMessage } = require("../controllers/message.controller");
const envConfig = require("../config");
connectedUsers = [];
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
    const { roomCode, userName, _id, fullName } = verifyToken(authToken, key);
    socket.join(roomCode);
    connectedUsers.push({ _id, userName, fullName, roomCode });
    io.sockets.in(roomCode).emit(
      "user-join",
      connectedUsers.filter((u) => u.roomCode == roomCode)
    );
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
      connectedUsers = connectedUsers.filter((u) => userName != u.userName);
      socket.to(roomCode).emit(
        "user-leave",
        connectedUsers.filter((u) => u.roomCode == roomCode)
      );
    });
  });
};
