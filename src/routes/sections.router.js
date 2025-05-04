import express from "express";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";
import { findCategoryById } from "../db/category/categories.db.js";
import { createSection, findSectionsByCategory } from "../db/section/sections.db.js";

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
        //profile타입 필수값 작성할 예정
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
 * @desc 특정 세션 단일 조회
 * @header x-portfolio-id: 포트폴리오 UUID
 */

router.get("/sections/:categoryId", jwtMiddleware, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ message: "카테고리를 찾을 수 없습니다." });
    }
    const section = await findSectionsByCategory(categoryId);

    return res.status(200).json({
      message: "섹션 단일 조회 성공",
      data: section,
    });
  } catch (err) {
    console.error(`섹션 단일 조회 에러${err}`, err);
    return res.status(500).json({ message: "섹션 단일 조회 실패" });
  }
});

/**
/**
 * @desc 포트폴리오 관련 테스트 API
 * @header Authorization: Bearer aaaa
 */
router.get("/test", async (req, res) => {
  const { portfolioId } = req.headers["x-portfolio-id"];

  return res.status(200).json({
    message: "포트폴리오 테스트 성공",
    data: {
      portfolioId,
      categoryId: "카테고리-UUID",
      content: {
        contentTitle: "UIUX Project",
        description: "스스로 시작한 다양한 프로젝트를 모았습니다.",
        projects: [
          {
            projectName: "프로젝트 이름",
            logoImage: { src: "/asset/image/Logo.png" },
            projectDescription: "프로젝트 설명...",
            date: "2025.02 ~ 2025.07",
            stacks: [{ stackName: "Figma", stackLogo: "/file.svg" }],
            projectImage: { src: "/asset/image/Logo_Image.png" },
            Participation: 54,
          },
        ],
      },
    },
  });
});

export default router;
