/**
 * @desc 임시저장 미들웨어
 * @abstract
 * 1. 클라이언트에서 포트폴리오 생성시작 요청이 들어올 경우 redis에 저장
 * 2. redis에 저장후 타이머 시작
 * 3. 타이머가 종료되기전 업데이트(debounce) 요청이 들어올 경우 데이터 업데이트 후 타이머 초기화
 * 4. 타이머가 종료된다면 현재 데이터를 db테이블에 저장후 타이머 초기화
 * 5. 임시저장 버튼을 클릭한다면 즉시 데이터를 db테이블에 저장 후 타이머 종료
 * 6. 다시 입력 시작시 타이머 시작
 */

import { redis } from "../db/redis/redis.functions.js";
import { RedisPortfolioError } from "../utils/error/redisError.js";
import CustomError from "../utils/error/customError.js";

const AUTO_SAVE_INTERVAL = 10; // 10분 (초 단위)
const REDIS_KEY_PREFIX = "autoSave:";

// 포트폴리오 작성 시작
export const startPortfolioEdit = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    if (!userId) {
      return next(new CustomError("사용자 인증이 필요합니다.", 401));
    }

    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;
    const initialData = {
      data: JSON.stringify(req.body),
      updatedAt: new Date().toISOString(),
      status: "editing",
    };

    // Redis에 초기 데이터 저장
    await redis.hash.set(redisKey, initialData);
    await redis.key.setExpire(redisKey, AUTO_SAVE_INTERVAL);

    res.status(200).json({
      message: "포트폴리오 작성이 시작되었습니다.",
      autoSaveEnabled: true,
    });
  } catch (err) {
    console.error("포트폴리오 작성 시작 에러:", err);
    next(new RedisPortfolioError("포트폴리오 작성 시작 실패"));
  }
};

// 자동저장 업데이트 (debounce)
export const updatePortfolioDraft = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;

    // Redis에 데이터가 있는지 확인
    const exists = await redis.key.exists(redisKey);
    if (!exists) {
      return next(new CustomError("작성 중인 포트폴리오가 없습니다.", 404));
    }

    // 데이터 업데이트
    const updatedData = {
      data: JSON.stringify(req.body),
      updatedAt: new Date().toISOString(),
      status: "editing",
    };

    await redis.hash.set(redisKey, updatedData);
    // 타이머 리셋
    await redis.key.setExpire(redisKey, AUTO_SAVE_INTERVAL);

    res.status(200).json({
      message: "자동저장이 완료되었습니다.",
      updatedAt: updatedData.updatedAt,
    });
  } catch (err) {
    console.error("자동저장 업데이트 에러:", err);
    next(new RedisPortfolioError("자동저장 업데이트 실패"));
  }
};

// 현재 작성 중인 데이터 조회
export const getPortfolioDraft = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;

    const savedData = await redis.hash.get(redisKey);
    if (!savedData) {
      return res.status(200).json({
        message: "작성 중인 포트폴리오가 없습니다.",
        exists: false,
      });
    }

    const ttl = await redis.key.getTTL(redisKey);
    res.status(200).json({
      exists: true,
      data: JSON.parse(savedData.data),
      updatedAt: savedData.updatedAt,
      expiresIn: ttl,
      status: savedData.status,
    });
  } catch (err) {
    console.error("작성 중인 데이터 조회 에러:", err);
    next(new RedisPortfolioError("작성 중인 데이터 조회 실패"));
  }
};

// 포트폴리오 작성 종료 (Redis 데이터 삭제)
export const endPortfolioEdit = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;

    await redis.hash.delete(redisKey);
    res.status(200).json({
      message: "포트폴리오 작성이 종료되었습니다.",
      autoSaveEnabled: false,
    });
  } catch (err) {
    console.error("포트폴리오 작성 종료 에러:", err);
    next(new RedisPortfolioError("포트폴리오 작성 종료 실패"));
  }
};
