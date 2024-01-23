const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  fullName: String,
});

module.exports = mongoose.model("user", userSchema);
