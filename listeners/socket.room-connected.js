module.exports = async (io, roomCode) => {
  const sockets = await io.in(roomCode).fetchSockets();
  const connectedUsers = sockets.map((socket) => socket.data);
  return connectedUsers;
};
