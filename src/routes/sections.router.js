import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @desc 섹션 생성
 * @route POST /api/sections
 * @header x-portfolio-id: 포트폴리오오 UUID
 * @body { "categoryId": "카테고리 UUID", "content": { ... }, "sortOrder": 0 }
 */

router.post("/sections", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { categoryId, content, sortOrder } = req.body;
    const userId = req.user;
    console.log(userId);
  } catch (err) {
    console.error(`섹션 생성 에러${err}`, err);
    return res.status(500).json({ message: "섹션 생성 실패" });
  }
});

/**
 * @desc 포트폴리오 관련 테스트 API
 * @header Authorization: Bearer aaaa
 */
router.get("/test", (req, res) => {
  const { portfolioId } = req.headers["x-portfolio-id"];
  return res.status(200).json({
    message: "포트폴리오 테스트 성공",
    data: {
      portfolioId,
      sections: [
        {
          id: "test-section-1",
          content: "테스트 섹션 1",
          sortOrder: 1,
        },
        {
          id: "test-section-2",
          content: "테스트 섹션 2",
          sortOrder: 2,
        },
      ],
    },
  });
});

export default router;
