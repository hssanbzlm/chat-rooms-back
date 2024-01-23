const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/user.router");
const chatRoomRouter = require("./routes/chat-room.router");
const envConfig = require("./config");
const connectDb = require("./database/mongo.database");
const { protect } = require("./middlewares/protect.middleware");
const { errorHandler } = require("./middlewares/error.middleware");
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);
app.use(protect);
app.use(errorHandler);
const start = async () => {
  await connectDb();
  app.listen(envConfig.port, () => {
    console.log("I'm listening on port", envConfig.port);
  });
};
start();
