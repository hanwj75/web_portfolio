import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";

/**
 *  @desc 포트폴리오 조회, 생성, 포트폴리오와 섹션 상세 조회기능
 */
export const createPortfolio = async (userId, title) => {
  try {
    const id = "aaaa"; //테스트
    const publicUrlId = uuidv4().slice(0, 8);
    const isPublic = false;
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

export const findUserPortfolios = async (userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_PORTFOLIOS, [userId]);
    return toCamelCase(rows);
  } catch (err) {
    console.error(`사용자의 모든 포트폴리오 조회 에러${err}`, err);
  }
};

export const findPortfolioWithSections = async (portfoliosId, userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_WITH_SECTIONS, [
      portfoliosId,
      userId,
    ]);

    if (!rows || rows.length === 0) return null;

    // 포트폴리오 기본 정보
    const portfolio = {
      portfolioId: rows[0].id,
      title: rows[0].title,
      createdAt: rows[0].createdAt,
      updatedAt: rows[0].updatedAt,
      sections: [],
    };
    //섹션 상세 정보
    rows.forEach((row) => {
      if (row.sectionId) {
        let content = row.content;
        if (typeof content === "string") {
          try {
            content = JSON.parse(content);
          } catch (err) {}
        }
        portfolio.sections.push({
          id: row.sectionId,
          type: row.type,
          content,
          sortOrder: row.sortOrder,
        });
      }
    });

    return portfolio;
  } catch (err) {
    console.error(`포트폴리오 상세 조회 에러${err}`, err);
  }
};

export const findPortfolioByUUID = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_BY_UUID, [id]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`포트폴리오ID 조회 에러${err}`, err);
  }
};

export const deployPortfolio = async (id, publicUrlId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DEPLOY_PORTFOLIO, [publicUrlId, id]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 배포 상태 업데이트 에러${err}`, err);
  }
};

export const findPortfolioByPublicUrlId = async (publicUrlId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_BY_PUBLIC_ID, [
      publicUrlId,
    ]);
    if (!rows || rows.length === 0) return null;
    //포트폴리오 기본 정보
    const portfolio = {
      portfolioId: rows[0].id,
      title: rows[0].title,
      createdAt: rows[0].createdAt,
      updatedAt: rows[0].updatedAt,
      sections: [],
    };
    //섹정 정보 추가
    rows.forEach((row) => {
      if (row.sectionId) {
        let content = row.content;
        if (typeof content === "string") {
          try {
            content = JSON.parse(content);
          } catch (err) {}
        }
        portfolio.sections.push({
          id: row.sectionId,
          type: row.type,
          content,
          sortOrder: row.sortOrder,
        });
      }
    });
    return portfolio;
  } catch (err) {
    console.error(`배포된 포트폴리오 조회 에러${err}`, err);
  }
};
export const deletePortfolio = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DELETE_PORTFOLIO, [id]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 삭제 에러${err}`, err);
  }
};
