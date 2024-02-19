const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  date: Date,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("message", messageSchema);
