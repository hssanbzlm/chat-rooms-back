module.exports.getConnectedUsersByRoom = async (io, roomCode) => {
  const sockets = await io.in(roomCode).fetchSockets();
  const uniqueSockets = sockets
    .filter(
      (socket, index) =>
        sockets.findIndex(({ data }) => data.userId == socket.data.userId) ===
        index
    )
    .map((sockets) => sockets.data);
  return uniqueSockets;
};
