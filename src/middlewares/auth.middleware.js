import jwt from "jsonwebtoken";
import config from "../config/config.js";
import CustomError from "../utils/error/customError.js";

export const jwtMiddleware = (req, res, next) => {
  try {
    const { JWT } = config.server;

    if (!JWT) {
      return next(new CustomError("JWT 시크릿 키가 없습니다.", 500));
    }
    const authHeader = req.headers["authorization"];

    const token = authHeader?.split(" ")[1];

    if (token == null) return next(new CustomError("토큰이 없습니다.", 401));

    jwt.verify(token, JWT, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new CustomError("토큰이 만료되었습니다.", 401));
        }
        return next(new CustomError("유효하지 않은 토큰입니다.", 403));
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.error(`토큰 검증 에러${err}`, err);
    return next(new CustomError("토큰 검증 실패", 401));
  }
};
