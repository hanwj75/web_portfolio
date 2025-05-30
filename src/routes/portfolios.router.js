import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPortfolio,
  findPortfolioByPublicUrlId,
  deployPortfolio,
  undeployPortfolio,
  deletePortfolio,
  findPortfolioByUUID,
  updatePortfolio,
  findUserPortfolios,
  findPortfolioByCategory,
  findPortfolioSortOrder,
} from "./../db/portfolio/portfolios.db.js";
import CustomError from "../utils/error/customError.js";
import { redis } from "../db/redis/redis.functions.js";
import {
  endPortfolioEdit,
  getPortfolioDraft,
  startPortfolioEdit,
  updatePortfolioDraft,
  savePortfolioDraft,
} from "../middlewares/autoSave.middleware.js";

const router = express.Router();

/**
 * @desc 포트폴리오 생성
 * @body
 * {"title":"포트폴리오 제목"}
 */
router.post("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title } = req.body;

    if (!title) {
      throw new CustomError("포트폴리오 제목이 필요합니다.", 400);
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
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 임시저장 시작, 업데이트, 조회, 삭제, 수동 저장
 */
router.post("/portfolios/draft/start", jwtMiddleware, startPortfolioEdit);
router.patch("/portfolios/draft", jwtMiddleware, updatePortfolioDraft);
router.get("/portfolios/draft", jwtMiddleware, getPortfolioDraft);
router.delete("/portfolios/draft", jwtMiddleware, endPortfolioEdit);
router.post("/portfolios/draft/save", jwtMiddleware, savePortfolioDraft);

/**
 * @desc 포트폴리오 수정
 * @header x-portfolio-id
 * @body
 * {"title":"포트폴리오 제목"}
 */
router.patch("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { id: userId } = req.user;
    const { title } = req.body;
    if (!title) {
      throw new CustomError("수정할 이름을 입력해주세요.", 400);
    }

    //포트폴리오 존재 여부 및 소유권 체크
    const portfolio = await findPortfolioByUUID(portfolioId);
    if (!portfolio) {
      throw new CustomError("포트폴리오를 찾을 수 없습니다.", 404);
    }

    if (portfolio.userId !== userId) {
      throw new CustomError("권한이 없습니다.", 403);
    }
    //포트폴리오 업데이트트
    const updated = await updatePortfolio(portfolioId, title);
    if (!updated) {
      throw new CustomError("포트폴리오 수정에 실패하였습니다.", 404);
    }

    return res.status(200).json({
      message: "포트폴리오 수정 완료",
      data: {
        portfolioId,
        title,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 현재 사용자 포트폴리오 목록 조회
 */
router.get("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const portfolios = await findUserPortfolios(userId);

    return res.status(200).json({
      message: "포트폴리오 목록 조회 성공",
      data: portfolios,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 전체 조회(비 로그인)
 */
router.get("/portfolios/:publicUrlId", async (req, res, next) => {
  try {
    const { publicUrlId } = req.params;

    if (!publicUrlId) {
      throw new CustomError("포트폴리오 URL ID가 필요합니다.", 400);
    }

    const portfolio = await findPortfolioByPublicUrlId(publicUrlId);

    if (!portfolio) {
      throw new CustomError("포트폴리오를 찾을 수 없습니다.", 404);
    }

    return res.status(200).json({
      message: "포트폴리오 조회 완료",
      data: portfolio,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 카테고리별 조회
 * @param publicUrlId : 포트폴리오 URL ID
 * @param categoryId : 카테고리 ID
 */
router.get("/portfolios/:publicUrlId/categories/:categoryId", async (req, res, next) => {
  try {
    const { publicUrlId, categoryId } = req.params;
    if (!publicUrlId || !categoryId) {
      throw new CustomError("포트폴리오 URL ID와 카테고리 ID가 필요합니다.", 400);
    }
    //카테고리와 섹션 정보 조회
    const category = await findPortfolioByCategory(publicUrlId, categoryId);
    if (!category) {
      throw new CustomError("카테고리를 찾을 수 없습니다.", 404);
    }

    return res.status(200).json({
      message: "포트폴리오 카테고리별 조회 성공",
      data: category,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 sortOrder 조회
 * @param publicUrlId : 포트폴리오 URL ID
 * @param sortOrder : 정렬 순서
 */
router.get("/portfolios/:publicUrlId/categories/order/:sortOrder", async (req, res, next) => {
  try {
    const { publicUrlId, sortOrder } = req.params;
    const order = parseInt(sortOrder);

    if (!publicUrlId || !order || order < 1) {
      throw new CustomError("포트폴리오 URL ID, 페이지 번호가 필요합니다.", 400);
    }

    //카테고리와 섹션 정보 조회
    const category = await findPortfolioSortOrder(publicUrlId, order);
    if (!category) {
      throw new CustomError("카테고리를 찾을 수 없습니다.", 404);
    }
    return res.status(200).json({
      message: "포트폴리오 sortOrder 조회 성공",
      data: category,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 공개 설정
 */
router.patch("/portfolios/deploy", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { id: userId } = req.user;

    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }

    // 포트폴리오 배포 상태 업데이트
    const isDeployed = await deployPortfolio(portfolioId, userId);

    if (!isDeployed) {
      throw new CustomError("포트폴리오를 찾을 수 없습니다.", 404);
    }

    return res.status(200).json({
      message: "포트폴리오 공개 설정 완료",
      data: {
        portfolioId,
        isPublic: true,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 비공개 설정
 */
router.patch("/portfolios/undeploy", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { id: userId } = req.user;

    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }

    // 포트폴리오 배포 상태 업데이트
    const isUnDeployed = await undeployPortfolio(portfolioId, userId);

    if (!isUnDeployed) {
      throw new CustomError("포트폴리오를 찾을 수 없습니다.", 404);
    }

    return res.status(200).json({
      message: "포트폴리오 공개 설정 완료",
      data: {
        portfolioId,
        isPublic: false,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 포트폴리오 삭제
 */
router.delete("/portfolios/:portfolioId", jwtMiddleware, async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const { id: userId } = req.user;
    if (!portfolioId) {
      throw new CustomError("포트폴리오 ID가 필요합니다.", 400);
    }

    //포트폴리오 존재 여부 OR 소유권 체크
    const portfolio = await findPortfolioByUUID(portfolioId);
    if (!portfolio) {
      throw new CustomError("포트폴리오를 찾을 수 없습니다.", 404);
    }

    if (portfolio.userId !== userId) {
      throw new CustomError("권한이 없습니다.", 403);
    }

    const deleted = await deletePortfolio(portfolioId);
    if (!deleted) {
      throw new CustomError("포트폴리오 삭제 실패", 400);
    }
    return res.status(200).json({
      message: "포트폴리오 삭제 완료",
      data: {
        portfolioId,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
