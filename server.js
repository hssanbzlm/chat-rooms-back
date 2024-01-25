const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user.router");
const chatRoomRouter = require("./routes/chat-room.router");
const authRouter = require("./routes/auth-router");
const envConfig = require("./config");
const connectDb = require("./database/mongo.database");
const socketListener = require("./listeners/socket");
const { errorHandler } = require("./middlewares/error.middleware");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);
app.use(errorHandler);
const start = async () => {
  await connectDb();
  const server = app.listen(envConfig.port, () => {
    console.log("I'm listening on port", envConfig.port);
  });
  socketListener(server);
};

module.exports = start;
