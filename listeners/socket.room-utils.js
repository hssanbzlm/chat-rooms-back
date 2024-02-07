module.exports.getConnectedUsersByRoom = async (io, roomCode) => {
  const sockets = await io.in(roomCode).fetchSockets();
  const uniqueSockets = sockets
    .filter(
      (socket, index) =>
        sockets.findIndex(({ data }) => data._id == socket.data._id) === index
    )
    .map((sockets) => sockets.data);
  return uniqueSockets;
};
