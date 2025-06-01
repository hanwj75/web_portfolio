import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import { findCategoryById } from "../db/category/categories.db.js";
import {
  createSection,
  findSectionsByCategory,
  updateSectionContent,
} from "../db/section/sections.db.js";
import CustomError from "../utils/error/customError.js";

const router = express.Router();

/**
 * @desc 섹션 생성
 * @route POST /api/sections
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body { "categoryId": "카테고리 UUID", "content": { ... } }
 */

router.post(
  "/portfolios/:portfolioId/categories/:categoryId/sections",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { portfolioId, categoryId } = req.params;
      const { content } = req.body;

      //필수값 체크
      if (!portfolioId || !categoryId || !content) {
        throw new CustomError("필수값 누락.", 400);
      }

      //카테고리 검증
      const category = await findCategoryById(categoryId, portfolioId);
      if (!category) {
        throw new CustomError("카테고리 존재하지 않습니다.", 404);
      }
      //섹션 생성 제한
      const existSections = await findSectionsByCategory(categoryId);
      if (existSections.length > 0) {
        throw new CustomError("이미 섹션이 존재합니다.", 409);
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
            throw new CustomError("profile 타입 필수값 누락", 400);
          }
          // contact 내부 필수값 체크
          if (!content.contact.phone || !content.contact.email || !content.contact.birthDate) {
            throw new CustomError("contact 필수값 누락", 400);
          }
          // information, skills, aboutMe가 배열인지 체크
          if (
            !Array.isArray(content.information) ||
            !Array.isArray(content.skills) ||
            !Array.isArray(content.aboutMe)
          ) {
            throw new CustomError("information, skills, aboutMe는 배열이어야 합니다.", 400);
          }
          break;
        case "project":
          if (
            !content.contentTitle ||
            !content.description ||
            !Array.isArray(content.projects) ||
            content.projects.length === 0
          ) {
            throw new CustomError("project 타입 필수값 누락", 400);
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
              throw new CustomError("projects 상세 필수값 누락락", 400);
            }
          }
          break;
        default:
          throw new CustomError("아직 지원하지 않는 카테고리 타입입니다.", 400);
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
      next(err);
    }
  },
);

/**
 * @desc 카테고리별 전체 섹션 조회
 */

router.get("/portfolios/:portfolioId/categories/:categoryId/sections", async (req, res, next) => {
  try {
    const { portfolioId, categoryId } = req.params;
    if (!portfolioId || !categoryId) {
      throw new CustomError("포트폴리오 ID와 카테고리 ID가 필요합니다.", 400);
    }
    //카테고리 존재 여부 확인
    const category = await findCategoryById(categoryId, portfolioId);
    if (!category) {
      throw new CustomError("카테고리를 찾을 수 없습니다.", 404);
    }
    const section = await findSectionsByCategory(categoryId);

    return res.status(200).json({
      message: "섹션 조회 성공",
      data: section,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc 섹션 수정
 * @header x-portfolio-id: 포트폴리오 UUID
 * @body { "categoryId": "카테고리 UUID", "content" }
 */

router.patch(
  "/portfolios/:portfolioId/categories/:categoryId/sections/:sectionId",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { portfolioId, categoryId, sectionId } = req.params;
      const { content } = req.body;

      //필수값 체크
      if (!portfolioId || !categoryId || !content) {
        throw new CustomError("필수값 누락", 400);
      }

      //카테고리 검증
      const category = await findCategoryById(categoryId, portfolioId);
      if (!category) {
        throw new CustomError("카테고리 존재하지 않습니다.", 404);
      }
      //섹션 존재 여부 확인(카테고리 내에서)
      const existSections = await findSectionsByCategory(categoryId);
      const section = existSections.find((s) => s.id === sectionId);
      if (!section) {
        throw new CustomError("섹션 존재하지 않습니다.", 404);
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
            throw new CustomError("profile 타입 필수값 누락", 400);
          }
          if (!content.contact.phone || !content.contact.email || !content.contact.birthDate) {
            throw new CustomError("contact 필수값 누락", 400);
          }
          if (
            !Array.isArray(content.information) ||
            !Array.isArray(content.skills) ||
            !Array.isArray(content.aboutMe)
          ) {
            throw new CustomError("information, skills, aboutMe는 배열이어야 합니다.", 400);
          }
          break;
        case "project":
          if (
            !content.contentTitle ||
            !content.description ||
            !Array.isArray(content.projects) ||
            content.projects.length === 0
          ) {
            throw new CustomError("project 타입 필수값 누락", 400);
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
              throw new CustomError("projects 상세 필수값 누락락", 400);
            }
          }
          break;
        default:
          throw new CustomError("아직 지원하지 않는 카테고리 타입입니다.", 400);
      }

      //섹션 업데이트
      const updated = await updateSectionContent(sectionId, categoryId, content);
      if (!updated) {
        throw new CustomError("섹션 업데이트 실패", 400);
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
      next(err);
    }
  },
);

export default router;
