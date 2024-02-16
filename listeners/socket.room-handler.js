const { saveMessage } = require("../controllers/message.controller");
const { getConnectedUsersByRoom } = require("./socket.room-utils");

module.exports = async (io, socket) => {
  const { roomCode, userName, avatar } = socket.data;
  socket.join(roomCode);
  const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
  io.sockets.in(roomCode).emit("user:join", connectedUsers);

  const sendMessage = async ({ content, date }) => {
    try {
      const savedMessage = await saveMessage({
        userName,
        roomCode,
        content,
        date,
      });
      io.sockets.in(roomCode).emit("user:message", {
        ...savedMessage,
        sender: { ...savedMessage.sender, avatar: avatar },
      });
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
  const handleRoomDestroy = () => {
    socket.to(roomCode).emit("room:destroyed");
  };

  const disconnect = async (reason) => {
    const connectedUsers = await getConnectedUsersByRoom(io, roomCode);
    socket.to(roomCode).emit("user:leave", connectedUsers);
  };

  socket.on("user:message", sendMessage);
  socket.on("user:typing", handleTypingUsers);
  socket.on("user:finish-typing", handleNotTypingUsers);
  socket.on("room:destroyed", handleRoomDestroy);
  socket.on("disconnect", disconnect);
};
