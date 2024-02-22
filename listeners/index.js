const { Server } = require("socket.io");
const envConfig = require("../config");
const socketMiddleware = require("./socket.middleware");
const registerRoomHandler = require("./socket.room-handler");
const registerPrivateHandler = require("./socket.private-handler");
const { redisAdapter } = require("./socket.redis-adapter");
const { logger } = require("../logger/logger");

module.exports = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: envConfig.originUrl,
      credentials: true,
    },
  });

  io.use(socketMiddleware);
  const adapter = await redisAdapter();
  io.adapter(adapter);

  io.on("connection", async (socket) => {
    try {
      await registerRoomHandler(io, socket);
      await registerPrivateHandler(io, socket);
    } catch (err) {
      logger.error(err);
    }
  });
};
