const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const userRouter = require("./routes/user.router");
const chatRoomRouter = require("./routes/chat-room.router");
const authRouter = require("./routes/auth-router");
const messageRouter = require("./routes/message.router");
const envConfig = require("./config");
const connectDb = require("./database/mongo.database");
const socketListener = require("./listeners");
const { errorHandler } = require("./middlewares/error.middleware");
const { protect } = require("./middlewares/protect.middleware");
const { logger } = require("./logger/logger");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: envConfig.originUrl, credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);
app.use("/api/messages", protect, messageRouter);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDb();
    const server = app.listen(envConfig.port, () => {
      logger.info(`I'm listening on port ${envConfig.port}`);
    });
    socketListener(server);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = start;
