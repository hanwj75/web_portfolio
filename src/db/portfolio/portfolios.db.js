import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";

/**
 *  @desc 포트폴리오 조회, 생성, 포트폴리오와 섹션 상세 조회기능
 */
export const createPortfolio = async (userId, title) => {
  try {
    const id = uuidv4();
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
    throw err;
  }
};

export const findUserPortfolios = async (userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_PORTFOLIOS, [userId]);
    return toCamelCase(rows);
  } catch (err) {
    console.error(`사용자의 모든 포트폴리오 조회 에러${err}`, err);
    throw err;
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
    throw err;
  }
};

export const findPortfolioByUUID = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_BY_UUID, [id]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`포트폴리오ID 조회 에러${err}`, err);
    throw err;
  }
};

export const deployPortfolio = async (id, userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DEPLOY_PORTFOLIO, [id, userId]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 배포 상태 업데이트 에러${err}`, err);
    throw err;
  }
};

export const undeployPortfolio = async (id, userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UNDEPLOY_PORTFOLIO, [id, userId]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 배포 상태 업데이트 에러${err}`, err);
    throw err;
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
      categories: [],
    };

    //카테고리와 섹션 정보 추가
    const categoryMap = new Map();

    rows.forEach((row) => {
      if (row.categoryId) {
        if (!categoryMap.has(row.categoryId)) {
          categoryMap.set(row.categoryId, {
            id: row.categoryId,
            name: row.categoryName,
            type: row.categoryType,
            sections: [],
          });
        }

        if (row.sectionId) {
          let content = row.content;
          if (typeof content === "string") {
            try {
              content = JSON.parse(content);
            } catch (err) {}
          }

          const category = categoryMap.get(row.categoryId);
          category.sections.push({
            id: row.sectionId,
            content,
            sortOrder: row.sortOrder,
          });
        }
      }
    });

    portfolio.categories = Array.from(categoryMap.values());
    return portfolio;
  } catch (err) {
    console.error(`배포된 포트폴리오 조회 에러${err}`, err);
    throw err;
  }
};

/**
 * @desc 포트폴리오 카테고리별 조회
 */
export const findPortfolioByCategory = async (publicUrlId, categoryId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_PORTFOLIO_BY_CATEGORY, [
      publicUrlId,
      categoryId,
    ]);
    if (!rows || rows.length === 0) return null;
    //카테고리와 섹션 정보
    const category = {
      id: rows[0].categoryId,
      name: rows[0].categoryName,
      type: rows[0].categoryType,
      sections: [],
    };
    //섹션 정보 추가
    rows.forEach((row) => {
      if (row.sectionId) {
        let content = row.sectionContent;
        if (typeof content === "string") {
          try {
            content = JSON.parse(content);
          } catch (err) {}
        }
        category.sections.push({
          id: row.sectionId,
          content,
        });
      }
    });
    return category;
  } catch (err) {
    console.error(`포트폴리오 카테고리별 조회 에러${err}`, err);
    throw err;
  }
};
/**
 * @desc 포트폴리오 수정
 */
export const updatePortfolio = async (id, title) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_PORTFOLIO, [title, id]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 수정 에러${err}`, err);
    throw err;
  }
};

export const deletePortfolio = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DELETE_PORTFOLIO, [id]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`포트폴리오 삭제 에러${err}`, err);
    throw err;
  }
};
