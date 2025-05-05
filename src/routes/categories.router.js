import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import { createCategory, findCategoriesByPortfolio } from "../db/category/categories.db.js";

const router = express.Router();

/**
 * @desc 카테고리 생성
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body
 * {"name":"카테고리 이름","type":"profile"}
 * {"name":"카테고리 이름","type":"project"}
 */

router.post("/categories", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { name, type } = req.body;

    if (!portfolioId) {
      return res.status(400).json({ message: "포트폴리오 ID가 필요합니다." });
    }
    if (!name || !type) {
      return res.status(400).json({ message: "카테고리 이름 OR 타입을 입력해주세요." });
    }

    //카테고리 생성
    const created = await createCategory(portfolioId, name, type);

    return res.status(201).json({
      message: "카테고리 생성 완료",
      data: {
        categoryId: created.id,
        name: created.name,
        type: created.type,
        sortOrder: created.sortOrder,
      },
    });
  } catch (err) {
    if (err.status === 409) {
      return res.status(409).json({ message: err.message });
    }
    console.error(`카테고리 생성 에러${err}`, err);
    return res.status(500).json({ message: "카테고리 생성 실패" });
  }
});

/**
 * @desc 포트폴리오의 모든 카테고리 조회
 */

router.get("/categories", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    if (!portfolioId) {
      return res.status(400).json({ message: "포트폴리오 ID가 필요합니다." });
    }
    const categories = await findCategoriesByPortfolio(portfolioId);

    return res.status(200).json({
      message: "카테고리 조회 완료",
      data: categories,
    });
  } catch (err) {
    console.error(`카테고리 조회 에러${err}`, err);
    return res.status(500).json({ message: "카테고리 조회 실패" });
  }
});

/**
 * @desc 포트폴리오의 모든 카테고리 조회(비 로그인)
 */
router.get("/categories/all", async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    if (!portfolioId) {
      return res.status(400).json({ message: "포트폴리오 ID가 필요합니다." });
    }
    const categories = await findCategoriesByPortfolio(portfolioId);

    return res.status(200).json({
      message: "카테고리 조회 완료",
      data: categories,
    });
  } catch (err) {
    console.error(`카테고리 조회 에러${err}`, err);
    return res.status(500).json({ message: "카테고리 조회 실패" });
  }
});

export default router;
