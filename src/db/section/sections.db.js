import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";

/**
 * @desc 섹션 생성
 */

export const createSection = async (portfolioId, type, content, sortOrder) => {
  try {
    const id = uuidv4();

    // content가 객체인지 확인
    if (typeof content !== "object" || content === null) {
      throw new Error("Content must be an object");
    }

    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_SECTION, [
      id,
      categoryId,
      JSON.stringify(content),
      sortOrder,
    ]);
    return { id, content, sortOrder };
  } catch (err) {
    console.error(`섹션 생성 에러${err}`, err);
  }
};

/**
 * @desc 카테고리별 섹션 조회회
 */

export const findSectionsByCategory = async (categoryId) => {
  const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_SECTIONS_BY_CATEGORY, [
    categoryId,
  ]);
  return toCamelCase(rows);
};

/**
 * @desc 섹션 내용 수정
 */

export const updateSectionContent = async (id, categoryId, content) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_SECTION_CONTENT, [
      JSON.stringify(content),
      id,
      categoryId,
    ]);

    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`섹션 업데이트 에러${err}`, err);
  }
};
