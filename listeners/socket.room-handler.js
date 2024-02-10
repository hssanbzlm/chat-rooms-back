const { saveMessage } = require("../controllers/message.controller");
const { getConnectedUsersByRoom } = require("./socket.room-utils");

module.exports = async (io, socket) => {
  const { roomCode, userName } = socket.data;
  socket.join(roomCode);
  const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
  io.sockets.in(roomCode).emit("user:join", connectedUsers);

  const sendMessage = async (payload) => {
    try {
      const savedMessage = await saveMessage({
        userName,
        roomCode,
        content: payload,
      });
      io.sockets.in(roomCode).emit("user:message", savedMessage);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTypingUsers = (fullName) => {
    socket.to(roomCode).emit("user:typing", fullName);
  };
  const handleNotTypingUsers = (fullName) => {
    socket.to(roomCode).emit("user:finish-typing", fullName);
  };

  const disconnect = async (reason) => {
    const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
    socket.to(roomCode).emit("user:leave", connectedUsers);
  };

  socket.on("user:message", sendMessage);
  socket.on("user:typing", handleTypingUsers);
  socket.on("user:finish-typing", handleNotTypingUsers);
  socket.on("disconnect", disconnect);
};
