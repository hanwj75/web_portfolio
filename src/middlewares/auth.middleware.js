import jwt from "jsonwebtoken";
import config from "../config/config.js";

const jwtMiddleware = (req, res, next) => {
  try {
    const { JWT } = config.server;

    if (!JWT) {
      throw new Error("JWT 시크릿 키가 없습니다.");
    }
    const authHeader = req.headers["authorization"];

    const token = authHeader?.split(" ")[1];

    if (token == null) return res.status(401).json({ message: "토큰이 없습니다." });

    jwt.verify(token, JWT, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "토큰이 만료되었습니다." });
        }
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.error(`토큰 검증 에러${err}`, err);
    return res.status(401).json({ message: "토큰 검증 실패" });
  }
};

export default jwtMiddleware;
