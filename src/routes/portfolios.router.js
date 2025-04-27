import express from "express";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import { createPortfolio } from "../db/portfolio/portfolios.db.js";
import { createSection } from "../db/section/sections.db.js";

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

    //섹션 유효성 검사
    // if (!sections || Array.isArray(sections) || sections.length === 0) {
    //   return res.status(400).json({
    //     message: "최소 1개 이상의 카테고리가 필요합니다.",
    //   });
    // }
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
        portfolioId: portfolio.id,
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
 * @desc 내 포트폴리오 목록 조회
 */

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
