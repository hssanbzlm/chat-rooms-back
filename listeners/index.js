const { Server } = require("socket.io");
const envConfig = require("../config");
const socketMiddleware = require("./socket.middleware");
const registerRoomHandler = require("./socket.room-handler");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: envConfig.originUrl,
      credentials: true,
    },
  });

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    registerRoomHandler(io, socket);
  });
};
