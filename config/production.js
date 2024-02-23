const envConfig = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  redisURL: process.env.REDIS_URL,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  authTokenKey: process.env.TOKEN_KEY,
  authTokenName: process.env.AUTH_TOKEN_NAME,
  originUrl: process.env.ORIGIN_URL,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApikey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

module.exports = envConfig;
