const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const envConfig = require("../config");
const { logger } = require("../logger/logger");
const pubClient = createClient({
  password: envConfig.redisPassword,
  socket: {
    host: envConfig.redisURL,
    port: envConfig.redisPort,
  },
});
const subClient = pubClient.duplicate();
subClient.on("error", (err) => logger.error(err));
pubClient.on("error", (err) => logger.error(err));
module.exports.redisAdapter = async () => {
  try {
    await pubClient.connect();
    await subClient.connect();
    return createAdapter(pubClient, subClient);
  } catch (err) {
    logger.error(err);
  }
};
