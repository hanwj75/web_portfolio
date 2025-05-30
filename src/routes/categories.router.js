import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  deleteSectionByCategoryId,
  findCategoriesByPortfolio,
  findCategoryById,
  reorderCategories,
  updateCategory,
} from "../db/category/categories.db.js";
import CustomError from "../utils/error/customError.js";

const router = express.Router();

/**
 * @desc 카테고리 생성
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body
 * {"name":"카테고리 이름","type":"profile"}
 */

router.post("/categories", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { name, type } = req.body;

    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }
    if (!name || !type) {
      throw new CustomError("카테고리 이름 OR 타입을 입력해주세요.", 400);
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
    next(err);
  }
});

/**
 * @desc 포트폴리오의 모든 카테고리 조회
 */

router.get("/categories", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }
    const categories = await findCategoriesByPortfolio(portfolioId);

    return res.status(200).json({
      message: "카테고리 조회 완료",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오의 모든 카테고리 조회(비 로그인)
 */
router.get("/categories/all", async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }
    const categories = await findCategoriesByPortfolio(portfolioId);

    return res.status(200).json({
      message: "카테고리 조회 완료",
      data: categories,
    });
  } catch (err) {
    next(err);
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
      throw new CustomError("필수값 누락", 400);
    }
    //카테고리 조회
    const category = await findCategoriesByPortfolio(portfolioId);
    const firstCategory = category.find((c) => c.id === firstCategoryId);
    const secondCategory = category.find((c) => c.id === secondCategoryId);

    if (!firstCategory || !secondCategory) {
      throw new CustomError("카테고리 조회 실패", 404);
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
    next(err);
  }
});

/**
 * @desc 카테고리 수정
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body
 * {"name":"변경할 이름","type":"profile"||"project"}
 */

router.patch("/categories/:categoryId", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { categoryId } = req.params;
    const { name, type } = req.body;

    if (!portfolioId || !categoryId) {
      throw new CustomError("필수값 누락", 400);
    }

    //카테고리 존재 여부 확인
    const category = await findCategoryById(categoryId, portfolioId);

    if (!category) {
      throw new CustomError("카테고리 조회 실패", 404);
    }

    //변경할 값 설정정(name 이나 type이 제공되지않은 경우 기존 값 유지)
    const newName = name || category.name;
    const newType = type || category.type;

    //type이 변경되는 경우에만 섹션 초기화
    if (type && category.type !== type) {
      await deleteSectionByCategoryId(categoryId);
    }

    //카테고리 정보 업데이트
    const updated = await updateCategory(categoryId, portfolioId, newName, newType);
    if (!updated) {
      throw new CustomError("카테고리 정보 업데이트 실패", 400);
    }
    return res.status(200).json({
      message: "카테고리 정보 업데이트 완료",
      data: {
        categoryId,
        name: newName,
        type: newType,
        isSectionReset: type && category.type !== type,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 카테고리 삭제
 * @header x-portfolio-id: 포트폴리오 UUID
 */

router.delete("/categories/:categoryId", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { categoryId } = req.params;

    if (!portfolioId || !categoryId) {
      throw new CustomError("필수값 누락", 400);
    }

    //카테고리 존재 여부 확인
    const category = await findCategoryById(categoryId, portfolioId);
    if (!category) {
      throw new CustomError("카테고리 조회 실패", 404);
    }

    //카테고리 삭제
    const deleted = await deleteCategory(categoryId, portfolioId);
    if (!deleted) {
      throw new CustomError("카테고리 삭제 실패", 400);
    }
    return res.status(200).json({
      message: "카테고리 삭제 완료",
      data: {
        categoryId,
      },
    });
  } catch (err) {
    next(err);
  }
});
export default router;
