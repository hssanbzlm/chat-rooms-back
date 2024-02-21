const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const envConfig = require("../config");
const pubClient = createClient({
  url: `${envConfig.redisURL}`,
});
const subClient = pubClient.duplicate();
module.exports.redisAdapter = async () => {
  try {
    await pubClient.connect();
    await subClient.connect();
    return createAdapter(pubClient, subClient);
  } catch (err) {
    console.log(err);
  }
};
