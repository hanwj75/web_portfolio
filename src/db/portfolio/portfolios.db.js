import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";

export const createPortfolio = async (userId, title, isPublic = false) => {
  try {
    const id = uuidv4();
    let publicUrlId = isPublic ? uuidv4().slice(0, 8) : null;

    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_PORTFOLIO, [
      id,
      userId,
      title,
      isPublic,
      publicUrlId,
    ]);

    return { id, publicUrlId };
  } catch (err) {
    console.error(`포트폴리오 생성 에러${err}`, err);
  }
};

export const findPortfolioByUUID = async (id) => {
  const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_BY_UUID, [id]);
  return toCamelCase(rows[0]);
};

export const deletePortfolio = async (id) => {
  const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DELETE_PORTFOLIO, [id]);
  return rows.affectedRows > 0;
};
