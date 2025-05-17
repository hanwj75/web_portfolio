import pools from "../db/database.js";
import { connectRedis } from "../db/redis/redis.js";

import { testAllConnections } from "../utils/db/testConnection.js";

//서버 실행전 사전작업
const initServer = async () => {
  try {
    await testAllConnections(pools);
    await connectRedis();
  } catch (err) {
    console.error(`Server Init Error : ${err}`);
    process.exit(1);
  }
};

export default initServer;
