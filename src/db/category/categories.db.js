import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase, toKebabCase } from "../../utils/response/transformCase.js";

/**
 * @desc 카테고리 생성
 */

export const createCategory = async (portfolioId, name, type) => {
  try {
    const id = uuidv4();
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_CATEGORY, [
      id,
      portfolioId,
      name,
      type,
    ]);
    return { id, name, type };
  } catch (err) {
    console.error(`카테고리 생성 에러${err}`, err);
  }
};

/**
 * @desc 포트폴리오의 모든 카테고리 조회
 */

export const findCategoriesByPortfolio = async (portfolioId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_CATEGORIES_BY_PORTFOLIO, [
      portfolioId,
    ]);
    return toCamelCase(rows).map((cat) => ({
      ...cat,
      slug: toKebabCase(cat.name),
    }));
  } catch (err) {
    console.error(`포트폴리오 카테고리 조회 에러${err}`, err);
  }
};

/**
 * @desc 특정 카테고리 상세 조회
 */

export const findCategoryById = async (categoryId, portfolioId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_CATEGORY_BY_ID, [
      categoryId,
      portfolioId,
    ]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`특정 카테고리 조회 에러${err}`, err);
  }
};
