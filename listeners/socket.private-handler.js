const { saveMessage } = require("../controllers/message.controller");

module.exports = async (io, socket) => {
  const { userName, avatar, fullName, userId } = socket.data;
  const sendMessage = async ({ to, content, date, privateChatName }) => {
    try {
      const savedMessage = await saveMessage({
        userId,
        userName,
        fullName,
        receiver: to,
        content,
        date,
      });
      io.sockets.to(privateChatName).emit("user-private:message", {
        ...savedMessage,
        sender: { ...savedMessage.sender, avatar: avatar },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const joinPrivate = (privateChatName) => {
    socket.join(privateChatName);
  };
  const handleTypingUsers = (privateChatName) => {
    socket.to(privateChatName).emit("user-private:typing");
  };
  const handleNotTypingUsers = (privateChatName) => {
    socket.to(privateChatName).emit("user-private:finish-typing");
  };

  socket.on("user-private:join", joinPrivate);
  socket.on("user-private:message", sendMessage);
  socket.on("user-private:typing", handleTypingUsers);
  socket.on("user-private:finish-typing", handleNotTypingUsers);
};
