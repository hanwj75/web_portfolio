import Redis from "ioredis";
import dbConfig from "../../config/dbConfig.js";
import { createDraft } from "../portfolio/draft.db.js";

const dotRedis = dbConfig.redis;

const redisCli = new Redis({
  host: dotRedis.REDIS_HOST,
  port: dotRedis.REDIS_PORT,
  password: dotRedis.REDIS_PASSWORD,
  // 재시도 없이 바로 실패하도록 설정
  retryStrategy: () => null,
  maxRetriesPerRequest: 0,
});

redisCli.on("error", (err) => {
  console.error("Redis 연결 에러:", err);
  process.exit(1);
});

redisCli.on("connect", () => {
  console.log("Redis 연결됨");
});

redisCli.on("end", () => {
  console.error("Redis 연결 종료");
  process.exit(1);
});

//Redis 연결 확인
export const connectRedis = async () => {
  try {
    await redisCli.ping();
  } catch (err) {
    console.error("Redis 연결 실패:", err);
    process.exit(1);
  }
};

export default redisCli;
