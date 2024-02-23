const env = process.env.MIX_ENV || "development";
envConfig = {};
if (env === "development") {
  envConfig = require("./development");
} else {
  envConfig = require("./production");
}

module.exports = envConfig;
