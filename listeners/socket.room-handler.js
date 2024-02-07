const { saveMessage } = require("../controllers/message.controller");
const { getConnectedUsersByRoom } = require("./socket.room-utils");

module.exports = async (io, socket) => {
  const { roomCode, userName } = socket.data;
  socket.join(roomCode);
  const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
  io.sockets.in(roomCode).emit("user-join", connectedUsers);

  const sendMessage = async (payload) => {
    const savedMessage = await saveMessage({
      userName,
      roomCode,
      content: payload,
    }).catch((err) => console.log(err));
    if (savedMessage) {
      io.sockets.in(roomCode).emit("new-message", {
        ...savedMessage,
      });
    }
  };

  const disconnect = async (reason) => {
    const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
    socket.to(roomCode).emit("user-leave", connectedUsers);
  };

  socket.on("send-message", sendMessage);
  socket.on("disconnect", disconnect);
};
