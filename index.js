const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const chatRoomRouter = require("./routes/chat-room.router");
const envConfig = require("./config");
const connectDb = require("./utils/db");
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);

const start = async () => {
  await connectDb();
  app.listen(envConfig.port, () => {
    console.log("I'm listening on port", envConfig.port);
  });
};
start();
