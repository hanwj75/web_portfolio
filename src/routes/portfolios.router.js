import express from "express";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import {
  createPortfolio,
  findPortfolioByUUID,
  findUserPortfolios,
} from "../db/portfolio/portfolios.db.js";
import {
  createSection,
  findSectionByType,
  updateSectionContent,
} from "../db/section/sections.db.js";
import { findUserByUUID } from "../db/user/user.db.js";

const router = express.Router();

/**
 * @desc 포트폴리오 생성 API
 */
router.post("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title, sections } = req.body;
    if (!title) {
      return res.status(400).json({ message: "포트폴리오 제목을 입력해주세요." });
    }

    // 섹션 유효성 검사
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({
        message: "섹션 데이터가 배열 형식이어야 합니다.",
      });
    }

    if (sections.length === 0) {
      return res.status(400).json({
        message: "최소 1개 이상의 카테고리가 필요합니다.",
      });
    }
    for (const section of sections) {
      if (!section.type || typeof section.type !== "string") {
        return res.status(400).json({ message: "각 섹션의 type 비어있음" });
      }
      if (!section.content || typeof section.content !== "object") {
        return res.status(400).json({ message: "각 섹션의 content는 객체 형태여야함" });
      }
    }

    //포트폴리오 생성
    const portfolio = await createPortfolio(userId, title);
    //섹션 생성
    const createdSections = await Promise.all(
      sections.map(async (section, index) => {
        const createdSection = await createSection(
          portfolio.id,
          section.type,
          section.content,
          index,
        );
        return {
          id: createdSection.id,
          type: createdSection.type,
          content: createdSection.content,
        };
      }),
    );

    return res.status(201).json({
      message: "포트폴리오 생성 완료",
      data: {
        title,
        sections: createdSections,
      },
    });
  } catch (err) {
    console.error(`포트폴리오 생성 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 생성 에러" });
  }
});

/**
 * @desc 특정 섹션 박스 선택 상태 업데이트
 */

router.patch(
  "/portfolios/:portfolioId/sections/:type/select",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { portfolioId, type } = req.params;
      const { selectedBoxTitle } = req.body;
      //포트폴리오 조회
      const portfolio = await findPortfolioByUUID(portfolioId);
      if (!portfolio) {
        return res.status(404).json({ message: "포트폴리오 조회 실패" });
      }
      // 해당 섹션 찾기
      const section = await findSectionByType(portfolioId, type);
      if (!section) {
        return res.status(404).json({ message: "해당 섹션 조회 실패" });
      }
      //content의 boxes업데이트
      const updateBoxes = section.content.boxes.map((box) => ({
        ...box,
        isSelected: box.title === selectedBoxTitle,
      }));

      //섹션 content 업데이트
      const updatedContent = {
        ...section.content,
        boxes: updateBoxes,
      };

      //DB 업데이트
      await updateSectionContent(section.id, updatedContent);
      return res.status(200).json({
        message: "섹션 박스 선택 상태 업데이트 완료",
        data: {
          type,
          content: updatedContent,
        },
      });
    } catch (err) {
      console.error(`특정 섹션 박스 선택 상태 업데이트 에러${err}`, err);
      return res.status(500).json({ message: "특정 섹션 박스 선택 상태 업데이트 에러" });
    }
  },
);

/**
 * @desc 내 포트폴리오 목록 조회
 */

router.get("/portfolios", jwtMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const user = await findUserByUUID(userId);

    if (!user) {
      return res.status(404).json({ message: "사용자 조회 실패" });
    }
    const portfolios = await findUserPortfolios(userId);

    return res.status(200).json({ message: "전체 포트폴리오 조회 성공", data: { portfolios } });
  } catch (err) {
    console.error(`포트폴리오 목록 조회 에러${err}`, err);
    return res.status(500).json({ message: "포트폴리오 목록 조회 에러" });
  }
});

/**
 * @desc 포트폴리오 수정
 */

/**
 * @desc 포트폴리오 삭제
 */

/**
 * @desc 포트폴리오 배포
 */

export default router;
