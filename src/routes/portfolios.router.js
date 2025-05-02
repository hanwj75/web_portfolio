import express from "express";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import { createPortfolio } from "./../db/portfolio/portfolios.db.js";

const router = express.Router();

/**
 * @desc 포트폴리오 생성
 * @header x-user-uuid: 유저 UUID JWT에서 추출
 * @body
 * {"title":"포트폴리오 제목"}
 */

router.post("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "포트폴리오 제목이 필요합니다." });
    }
    //포트폴리오 생성
    const { id: portfolioId, publicUrlId } = await createPortfolio(userId, title);

    return res.status(201).json({
      message: "포트폴리오 생성 완료",
      data: {
        portfolioId,
        title,
        publicUrlId,
        isPublic: false,
      },
    });

    //2.카테고리 생성성
  } catch (err) {
    console.error(`포트폴리오 생성 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 생성 실패" });
  }
});
export default router;
