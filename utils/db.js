const config = require("../config");
const mongoose = require("mongoose");

module.exports = () => mongoose.connect(config.dbUri);
