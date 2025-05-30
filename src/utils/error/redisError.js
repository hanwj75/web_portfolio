import CustomError from "./customError.js";

export class RedisError extends CustomError {
  constructor(message, status = 500) {
    super(message, status);
    this.name = "RedisError";
  }
}

// Redis 에러 타입별 클래스
export class RedisHashError extends RedisError {
  constructor(message) {
    super(message, 500);
    this.name = "RedisHashError";
  }
}

export class RedisKeyError extends RedisError {
  constructor(message) {
    super(message, 500);
    this.name = "RedisKeyError";
  }
}

export class RedisPortfolioError extends RedisError {
  constructor(message) {
    super(message, 500);
    this.name = "RedisPortfolioError";
  }
}
