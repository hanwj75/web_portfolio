import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPortfolio,
  findPortfolioByPublicUrlId,
  deployPortfolio,
  undeployPortfolio,
} from "./../db/portfolio/portfolios.db.js";

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
  } catch (err) {
    console.error(`포트폴리오 생성 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 생성 실패" });
  }
});

/**
 * @desc 포트폴리오 전체 조회(비 로그인)
 * @route GET /api/portfolios/:publicUrlId
 */
router.get("/portfolios/:publicUrlId", async (req, res, next) => {
  try {
    const { publicUrlId } = req.params;

    if (!publicUrlId) {
      return res.status(400).json({ message: "포트폴리오 URL ID가 필요합니다." });
    }

    const portfolio = await findPortfolioByPublicUrlId(publicUrlId);

    if (!portfolio) {
      return res.status(404).json({ message: "포트폴리오를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      message: "포트폴리오 조회 완료",
      data: portfolio,
    });
  } catch (err) {
    console.error(`포트폴리오 조회 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 조회 실패" });
  }
});

/**
 * @desc 포트폴리오 공개 설정
 * @route PATCH /api/portfolios/deploy
 */
router.patch("/portfolios/deploy", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { id: userId } = req.user;

    if (!portfolioId) {
      return res.status(400).json({ message: "포트폴리오 ID가 필요합니다." });
    }

    // 포트폴리오 배포 상태 업데이트
    const isDeployed = await deployPortfolio(portfolioId, userId);

    if (!isDeployed) {
      return res.status(404).json({ message: "포트폴리오를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      message: "포트폴리오 공개 설정 완료",
      data: {
        portfolioId,
        isPublic: true,
      },
    });
  } catch (err) {
    console.error(`포트폴리오 공개 설정 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 공개 설정 실패" });
  }
});

/**
 * @desc 포트폴리오 비공개 설정
 * @route PATCH /api/portfolios/undeploy
 */
router.patch("/portfolios/undeploy", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { id: userId } = req.user;

    if (!portfolioId) {
      return res.status(400).json({ message: "포트폴리오 ID가 필요합니다." });
    }

    // 포트폴리오 배포 상태 업데이트
    const isUnDeployed = await undeployPortfolio(portfolioId, userId);

    if (!isUnDeployed) {
      return res.status(404).json({ message: "포트폴리오를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      message: "포트폴리오 공개 설정 완료",
      data: {
        portfolioId,
        isPublic: false,
      },
    });
  } catch (err) {
    console.error(`포트폴리오 공개 설정 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 공개 설정 실패" });
  }
});

export default router;
