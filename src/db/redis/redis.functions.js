// src/db/redis/redis.functions.js
import redisCli from "./redis.js";
import {
  RedisHashError,
  RedisKeyError,
  RedisPortfolioError,
} from "../../utils/error/redisError.js";

export const redis = {
  hash: {
    set: async (key, data) => {
      try {
        return await redisCli.hset(key, ...Object.entries(data).flat());
      } catch (err) {
        console.error("Redis Hash Set Error:", err);
        throw new RedisHashError(`Redis Hash 데이터 저장 실패: ${err.message}`);
      }
    },

    get: async (key) => {
      try {
        return await redisCli.hgetall(key);
      } catch (err) {
        console.error("Redis Hash Get Error:", err);
        throw new RedisHashError(`Redis Hash 데이터 조회 실패: ${err.message}`);
      }
    },

    getField: async (key, field) => {
      try {
        return await redisCli.hget(key, field);
      } catch (err) {
        console.error("Redis Hash Get Field Error:", err);
        throw new RedisHashError(`Redis Hash 필드 조회 실패: ${err.message}`);
      }
    },

    updateField: async (key, field, value) => {
      try {
        return await redisCli.hset(key, field, value);
      } catch (err) {
        console.error("Redis Hash Update Field Error:", err);
        throw new RedisHashError(`Redis Hash 필드 업데이트 실패: ${err.message}`);
      }
    },

    delete: async (key) => {
      try {
        return await redisCli.del(key);
      } catch (err) {
        console.error("Redis Hash Delete Error:", err);
        throw new RedisHashError(`Redis Hash 데이터 삭제 실패: ${err.message}`);
      }
    },

    deleteField: async (key, field) => {
      try {
        return await redisCli.hdel(key, field);
      } catch (err) {
        console.error("Redis Hash Delete Field Error:", err);
        throw new RedisHashError(`Redis Hash 필드 삭제 실패: ${err.message}`);
      }
    },
  },

  key: {
    setExpire: async (key, seconds) => {
      try {
        return await redisCli.expire(key, seconds);
      } catch (err) {
        console.error("Redis Set Expire Error:", err);
        throw new RedisKeyError(`Redis 키 만료 시간 설정 실패: ${err.message}`);
      }
    },

    getTTL: async (key) => {
      try {
        return await redisCli.ttl(key);
      } catch (err) {
        console.error("Redis Get TTL Error:", err);
        throw new RedisKeyError(`Redis 키 만료 시간 조회 실패: ${err.message}`);
      }
    },

    exists: async (key) => {
      try {
        return await redisCli.exists(key);
      } catch (err) {
        console.error("Redis Key Exists Error:", err);
        throw new RedisKeyError(`Redis 키 존재 여부 확인 실패: ${err.message}`);
      }
    },
  },

  portfolio: {
    createAutoSaveKey: (userId, portfolioId) => {
      return `portfolio:${userId}:${portfolioId}:autosave`;
    },

    portAutoSave: async (userId, portfolioId, data) => {
      const key = redis.portfolio.createAutoSaveKey(userId, portfolioId);
      try {
        await redis.hash.set(key, {
          ...data,
          lastSaved: new Date().toISOString(),
          isAutoSaved: "true",
        });
        await redis.key.setExpire(key, 24 * 60 * 60);
        return true;
      } catch (err) {
        console.error("Portfolio Auto Save Error:", err);
        throw new RedisPortfolioError(`포트폴리오 자동 저장 실패: ${err.message}`);
      }
    },

    getAutoSave: async (userId, portfolioId) => {
      const key = redis.portfolio.createAutoSaveKey(userId, portfolioId);
      try {
        return await redis.hash.get(key);
      } catch (err) {
        console.error("Portfolio Auto Save Get Error:", err);
        throw new RedisPortfolioError(`포트폴리오 자동 저장 데이터 조회 실패: ${err.message}`);
      }
    },

    deleteAutoSave: async (userId, portfolioId) => {
      const key = redis.portfolio.createAutoSaveKey(userId, portfolioId);
      try {
        return await redis.hash.delete(key);
      } catch (err) {
        console.error("Portfolio Auto Save Delete Error:", err);
        throw new RedisPortfolioError(`포트폴리오 자동 저장 데이터 삭제 실패: ${err.message}`);
      }
    },
  },
};
