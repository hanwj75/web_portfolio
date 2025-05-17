import envData from "../constants/env.js";

const dotDb = envData.database;
const dotRedis = envData.redis;

const dbConfig = {
  database: {
    PORTFOLIOS_DB: {
      name: dotDb.DB1_NAME,
      user: dotDb.DB1_USER,
      password: dotDb.DB1_PASSWORD,
      host: dotDb.DB1_HOST,
      port: dotDb.DB1_PORT,
    },
  },
  redis: {
    REDIS_HOST: dotRedis.REDIS_HOST,
    REDIS_PORT: dotRedis.REDIS_PORT,
    REDIS_PASSWORD: dotRedis.REDIS_PASSWORD,
  },
};

export default dbConfig;
