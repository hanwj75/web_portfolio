import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";

/**
 * @desc 카테고리 생성
 */

export const createCategory = async (portfolioId, name, type) => {
  try {
    // 해당 포트폴리오의 마지막 sortOrder 조회
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_LAST_CATEGORY_ORDER, [
      portfolioId,
    ]);
    const nextOrder = (rows[0].maxOrder || 0) + 1;

    //카테고리 생성
    const id = uuidv4();
    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_CATEGORY, [
      id,
      portfolioId,
      name,
      type,
      nextOrder,
    ]);
    return { id, name, type, sortOrder: nextOrder };
  } catch (err) {
    console.error(`카테고리 생성 에러${err}`, err);
    throw err;
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
      id: cat.id,
      name: cat.name,
      type: cat.type,
      sortOrder: cat.sortOrder,
    }));
  } catch (err) {
    console.error(`포트폴리오 카테고리 조회 에러${err}`, err);
    throw err;
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
    throw err;
  }
};
