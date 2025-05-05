import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import { findCategoryById } from "../db/category/categories.db.js";
import {
  createSection,
  findSectionsByCategory,
  updateSectionContent,
} from "../db/section/sections.db.js";

const router = express.Router();

/**
 * @desc 섹션 생성
 * @route POST /api/sections
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body { "categoryId": "카테고리 UUID", "content": { ... } }
 */

router.post("/sections", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { categoryId, content } = req.body;

    //필수값 체크
    if (!portfolioId || !categoryId || !content) {
      return res.status(400).json({ message: "필수값 누락." });
    }
    //카테고리 검증
    const category = await findCategoryById(categoryId, portfolioId);
    if (!category) {
      return res.status(404).json({ message: "카테고리 존재하지 않습니다." });
    }
    //섹션 생성 제한
    const existSections = await findSectionsByCategory(categoryId);
    if (existSections.length > 0) {
      return res.status(409).json({ message: "이미 섹션이 존재합니다." });
    }
    //타입 검증
    switch (category.type) {
      case "profile":
        if (
          !content.contentTitle ||
          !content.shortIntro ||
          !content.contact ||
          !content.information ||
          !content.skills ||
          !content.aboutMe
        ) {
          return res.status(400).json({ message: "profile 타입 필수값 누락" });
        }
        // contact 내부 필수값 체크
        if (!content.contact.phone || !content.contact.email || !content.contact.birthDate) {
          return res.status(400).json({ message: "contact 필수값 누락" });
        }
        // information, skills, aboutMe가 배열인지 체크
        if (
          !Array.isArray(content.information) ||
          !Array.isArray(content.skills) ||
          !Array.isArray(content.aboutMe)
        ) {
          return res
            .status(400)
            .json({ message: "information, skills, aboutMe는 배열이어야 합니다." });
        }
        break;
      case "project":
        if (
          !content.contentTitle ||
          !content.description ||
          !Array.isArray(content.projects) ||
          content.projects.length === 0
        ) {
          return res.status(400).json({ message: "project 타입 필수값 누락" });
        }
        //projects 배열 내부 필수값 체크
        for (const projects of content.projects) {
          if (
            !projects.projectName ||
            !projects.logoImage ||
            !projects.projectDescription ||
            !projects.date ||
            !Array.isArray(projects.stacks) ||
            !projects.projectImage ||
            typeof projects.Participation !== "number"
          ) {
            return res.status(400).json({ message: "projects 상세 필수값 누락락" });
          }
        }
        break;
      default:
        return res.status(400).json({ message: "아직 지원하지 않는 카테고리 타입입니다." });
    }

    //섹션 생성
    const section = await createSection(categoryId, content);
    return res.status(201).json({
      message: "섹션 생성 완료",
      data: {
        sectionId: section.id,
        categoryId: section.categoryId,
        content: section.content,
      },
    });
  } catch (err) {
    console.error(`섹션 생성 에러${err}`, err);
    return res.status(500).json({ message: "섹션 생성 실패" });
  }
});

/**
 * @desc 카테고리별 전체 섹션 조회
 */

router.get("/sections/:categoryId", jwtMiddleware, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ message: "카테고리를 찾을 수 없습니다." });
    }
    const section = await findSectionsByCategory(categoryId);

    return res.status(200).json({
      message: "섹션 조회 성공",
      data: section,
    });
  } catch (err) {
    console.error(`섹션 조회 에러${err}`, err);
    return res.status(500).json({ message: "섹션 조회 실패" });
  }
});

/**
 * @desc 섹션 수정
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body { "categoryId": "카테고리 UUID", "content" }
 */

router.patch("/sections/:sectionId", jwtMiddleware, async (req, res, next) => {
  try {
    const portfolioId = req.headers["x-portfolio-id"];
    const { sectionId } = req.params;
    const { categoryId, content } = req.body;

    //필수값 체크
    if (!portfolioId || !categoryId || !content) {
      return res.status(400).json({ message: "필수값 누락" });
    }

    //카테고리 검증
    const category = await findCategoryById(categoryId, portfolioId);
    if (!category) {
      return res.status(404).json({ message: "카테고리 존재하지 않습니다." });
    }
    //섹션 존재 여부 확인(카테고리 내에서)
    const existSections = await findSectionsByCategory(categoryId);
    const section = existSections.find((s) => s.id === sectionId);
    if (!section) {
      return res.status(404).json({ message: "섹션 존재하지 않습니다." });
    }

    // 타입별 필수값 검증 (생성과 동일하게)
    switch (category.type) {
      case "profile":
        if (
          !content.contentTitle ||
          !content.shortIntro ||
          !content.contact ||
          !content.information ||
          !content.skills ||
          !content.aboutMe
        ) {
          return res.status(400).json({ message: "profile 타입 필수값 누락" });
        }
        if (!content.contact.phone || !content.contact.email || !content.contact.birthDate) {
          return res.status(400).json({ message: "contact 필수값 누락" });
        }
        if (
          !Array.isArray(content.information) ||
          !Array.isArray(content.skills) ||
          !Array.isArray(content.aboutMe)
        ) {
          return res
            .status(400)
            .json({ message: "information, skills, aboutMe는 배열이어야 합니다." });
        }
        break;
      case "project":
        if (
          !content.contentTitle ||
          !content.description ||
          !Array.isArray(content.projects) ||
          content.projects.length === 0
        ) {
          return res.status(400).json({ message: "project 타입 필수값 누락" });
        }
        for (const projects of content.projects) {
          if (
            !projects.projectName ||
            !projects.logoImage ||
            !projects.projectDescription ||
            !projects.date ||
            !Array.isArray(projects.stacks) ||
            !projects.projectImage ||
            typeof projects.Participation !== "number"
          ) {
            return res.status(400).json({ message: "projects 상세 필수값 누락락" });
          }
        }
        break;
      default:
        return res.status(400).json({ message: "아직 지원하지 않는 카테고리 타입입니다." });
    }

    //섹션 업데이트
    const updated = await updateSectionContent(sectionId, categoryId, content);
    if (!updated) {
      return res.status(400).json({ message: "섹션 업데이트 실패" });
    }

    return res.status(200).json({
      message: "섹션 업데이트 성공",
      data: {
        id: sectionId,
        categoryId,
        content,
      },
    });
  } catch (err) {
    console.error(`섹션 수정 에러${err}`, err);
    return res.status(500).json({ message: "섹션 수정 실패" });
  }
});

export default router;
