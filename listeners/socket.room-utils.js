const { logger } = require("../logger/logger");
module.exports.getConnectedUsersByRoom = async (io, roomCode) => {
  try {
    const sockets = await io.in(roomCode).fetchSockets();
    const uniqueSockets = sockets
      .filter(
        (socket, index) =>
          sockets.findIndex(({ data }) => data.userId == socket.data.userId) ===
          index
      )
      .map((sockets) => sockets.data);
    return uniqueSockets;
  } catch (err) {
    logger.error(err);
  }
};
