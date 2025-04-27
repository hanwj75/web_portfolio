import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";

export const createSection = async (portfolioId, type, content, sortOrder) => {
  try {
    const id = uuidv4();

    // content가 객체인지 확인
    if (typeof content !== "object" || content === null) {
      throw new Error("Content must be an object");
    }

    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_SECTION, [
      id,
      portfolioId,
      type,
      JSON.stringify(content),
      sortOrder,
    ]);
    return { id, type, content, sortOrder };
  } catch (err) {
    console.error(`섹션 생성 에러${err}`, err);
  }
};

export const updateSectionContent = async (id, content) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_SECTION_CONTENT, [
      JSON.stringify(content),
      sectionId,
    ]);

    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`섹션 업데이트 에러${err}`, err);
  }
};
