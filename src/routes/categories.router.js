import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  findCategoriesByPortfolio,
  reorderCategories,
} from "../db/category/categories.db.js";

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
router.get("/portfolios/categories", async (req, res, next) => {
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
 * @desc 카테고리 순서 재정렬
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body
 * {firstCategoryId: "카테고리 1번", "secondCategoryId":"카테고리4번"}
 */

router.patch("/categories/reorder", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { firstCategoryId, secondCategoryId } = req.body;

    if (!portfolioId || !firstCategoryId || !secondCategoryId) {
      return res.status(400).json({ message: "필수값 누락" });
    }
    //카테고리 조회
    const category = await findCategoriesByPortfolio(portfolioId);
    const firstCategory = category.find((c) => c.id === firstCategoryId);
    const secondCategory = category.find((c) => c.id === secondCategoryId);

    if (!firstCategory || !secondCategory) {
      return res.status(404).json({ message: "카테고리 조회 실패" });
    }

    //순서 교환
    const result = await reorderCategories(
      portfolioId,
      firstCategoryId,
      firstCategory.sortOrder,
      secondCategoryId,
      secondCategory.sortOrder,
    );

    return res.status(200).json({
      message: "카테고리 순서 재정렬 완료",
      data: result,
    });
  } catch (err) {
    console.error(`카테고리 순서 재정렬 에러${err}`, err);
    return res.status(500).json({ message: "카테고리 순서 재정렬 실패" });
  }
});

export default router;
