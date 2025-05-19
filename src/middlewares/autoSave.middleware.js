import { findCategoriesByPortfolio } from "../db/category/categories.db.js";
import { findPortfolioByUUID } from "../db/portfolio/portfolios.db.js";
import { redis } from "../db/redis/redis.functions.js";
import { findSectionsByCategory } from "../db/section/sections.db.js";
import { RedisPortfolioError } from "../utils/error/redisError.js";
import { v4 as uuidv4 } from "uuid";

const AUTO_SAVE_INTERVAL = 5 * 60 * 1000; //5분

export const autoSaveMiddleware = async (req, res, next) => {
  //POST,PATCH 요청만 처리
  if (!["POST", "PATCH"].includes(req.method)) {
    return next();
  }
  const { id: userId } = req.user;
  let portfolioId = req.headers["x-portfolio-id"];
  console.log("[AUTO SAVE] 초기 portfolioId:", portfolioId);
  //포트폴리오 생성 전 임시저장
  if (!portfolioId && req.path === "/portfolios" && req.method === "POST") {
    portfolioId = `draft-${uuidv4()}`;
    req.tempPortfolioId = portfolioId;
    console.log("[AUTO SAVE] 임시 portfolioId 생성 후:", portfolioId);
  }
  console.log("[AUTO SAVE] 최종 portfolioId:", portfolioId);
  if (!userId || !portfolioId) {
    return next();
  }
  console.log("문제---------------------------1");
  try {
    // 현재까지의 임시저장 데이터 가져오기
    const existingData = await redis.portfolio.getAutoSave(userId, portfolioId);
    const now = new Date().getTime();
    console.log("문제---------------------------2");
    // 마지막 저장 시간 체크
    const shouldAutoSave =
      !existingData || now - new Date(existingData.lastSaved).getTime() >= AUTO_SAVE_INTERVAL;
    console.log("문제---------------------------3", existingData);
    // 5분이 지났거나 데이터가 없는 경우에만 저장
    if (shouldAutoSave) {
      const dataToSave = existingData || {
        isTemp: true,
        portfolio: { title: req.body.title || "임시 포트폴리오 제목" },
        categories: [],
        lastSaved: new Date().toISOString(),
      };
      console.log("문제---------------------------4");
      // 요청별 데이터 업데이트

      // POST 요청 처리 (임시저장)
      if (req.method === "POST") {
        if (req.path.startsWith("/categories")) {
          dataToSave.categories.push({
            name: req.body.name,
            type: req.body.type,
            tempCategoryId: `temp_category_${uuidv4()}`,
            section: null,
          });
          console.log("문제---------------------------5");
        } else if (req.path.startsWith("/sections")) {
          const categoryIndex = dataToSave.categories.findIndex(
            (c) => c.tempCategoryId === req.body.tempCategoryId,
          );
          if (categoryIndex !== -1) {
            dataToSave.categories[categoryIndex].section = {
              content: req.body.content,
            };
          }
        }
      }

      // PATCH 요청 처리 (실제 포트폴리오 수정)
      else if (req.method === "PATCH") {
        // URL에서 ID 추출
        const pathParts = req.path.split("/");
        const targetId = pathParts[pathParts.length - 1];

        if (req.path.startsWith("/categories/")) {
          // 카테고리 수정 - 실제 categoryId만 사용
          const categoryIndex = dataToSave.categories.findIndex((c) => c.id === targetId);
          console.log("문제---------------------------7");
          if (categoryIndex !== -1) {
            dataToSave.categories[categoryIndex] = {
              ...dataToSave.categories[categoryIndex],
              name: req.body.name || dataToSave.categories[categoryIndex].name,
              type: req.body.type || dataToSave.categories[categoryIndex].type,
            };
          }
          console.log("문제---------------------------8");
        } else if (req.path.startsWith("/sections/")) {
          // 섹션 수정 - 실제 sectionId만 사용
          for (const category of dataToSave.categories) {
            if (category.section && category.section.id === targetId) {
              category.section.content = {
                ...category.section.content,
                ...req.body.content,
              };
              break;
            }
          }
        }
      }
      // 마지막 저장 시간 업데이트
      console.log("문제---------------------------9");
      dataToSave.lastSaved = new Date().toISOString();
      console.log("문제---------------------------10");
      // Redis에 저장
      await redis.portfolio.portAutoSave(userId, portfolioId, dataToSave);
      console.log("문제---------------------------11");
      console.log(`[AUTO SAVE] 자동 저장 완료 - ${portfolioId}`);
    }
  } catch (err) {
    console.error(`[AUTO SAVE] 자동 저장 실패 ${err}`);
    next(err);
  }
  next();
};
