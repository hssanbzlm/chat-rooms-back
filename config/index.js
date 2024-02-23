const envConfig = require("./development");

const env = process.env.MIX_ENV || "development";
envConfig = {};
switch (env) {
  case "development":
    envConfig = require("./development");
    break;
  case "prod":
    envConfig = require("./production");
    break;
}

module.exports = envConfig;
