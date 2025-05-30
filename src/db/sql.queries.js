export const SQL_QUERIES = {
  //Users
  FIND_USER_BY_UUID: `SELECT * FROM Users WHERE id = ?`,
  FIND_USER_BY_EMAIL: `SELECT * FROM Users WHERE email = ?`,
  FIND_USER_BY_NAME: `SELECT * FROM Users WHERE userName = ?`,
  CREATE_USER: `INSERT INTO Users (id,email, password, userName) VALUES (?,?,?,?)`,
  UPDATE_USER_LOGIN: `UPDATE Users SET updatedAt = CURRENT_TIMESTAMP WHERE email = ?`,
  DELETE_USER: `DELETE FROM Users WHERE id = ?`,
  UPDATE_USER_NAME: `UPDATE Users SET userName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
  UPDATE_USER_PASSWORD: `UPDATE Users SET password = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
  UPDATE_USER_ALL: `UPDATE Users SET userName = ?, password = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,

  //Portfolios
  //포트폴리오 생성
  CREATE_PORTFOLIO: `INSERT INTO Portfolios (id,userId,title,isPublic,publicUrlId) VALUES(?,?,?,?,?)`,
  //포트폴리오 단일 조회
  FIND_PORTFOLIO_BY_UUID: `SELECT * FROM Portfolios WHERE id = ?`,
  //사용자의 모든 포트폴리오 목록 조회
  FIND_USER_PORTFOLIOS: `SELECT * FROM Portfolios WHERE userId = ? ORDER BY createdAt ASC`,

  // //포트폴리오 이름으로 검색
  // FIND_PORTFOLIO_BY_TITLE: `SELECT * FROM Portfolios WHERE title LIKE CONCAT('%',?,'%') `,

  //포트폴리오 카테고리별 조회
  FIND_PORTFOLIO_BY_CATEGORY: `SELECT p.*,c.id as categoryId, c.name as categoryName, c.type as categoryType, s.id as sectionId, s.content as sectionContent 
  FROM Portfolios p
  LEFT JOIN Categories c ON p.id = c.portfolioId
  LEFT JOIN Sections s ON c.id = s.categoryId
  WHERE p.publicUrlId = ? AND p.isPublic = true AND c.id = ? `,
  //포트폴리오 전체 정보 조회 (포트폴리오에 대한 모든 정보 반환)
  FIND_PORTFOLIO_WITH_CATEGORIES_AND_SECTIONS: `SELECT p.*,c.id as categoryId,c.name as categoryName,c.type as categoryType,s.id as sectionId,s.content as sectionContent,s.sortOrder as sectionOrder 
    FROM Portfolios p
    LEFT JOIN Categories c ON p.id = c.portfolioId
    LEFT JOIN Sections s ON c.id = s.categoryId
    WHERE p.id = ?
    ORDER BY c.name ASC, s.sortOrder ASC
  `,
  //포트폴리오 sortOrder 조회
  FIND_PORTFOLIO_CATEGORY_ORDER: `SELECT c.id as categoryId,c.name as categoryName,c.type as categoryType,c.sortOrder,s.id as sectionId, s.content as sectionContent 
  FROM Portfolios p
  LEFT JOIN Categories c ON p.id = c.portfolioId
  LEFT JOIN Sections s ON c.id = s.categoryId
  WHERE p.publicUrlId = ?
  AND p.isPublic = true
  AND c.sortOrder = ? `,
  //포트폴리오 수정
  UPDATE_PORTFOLIO: `UPDATE Portfolios SET title = ?,updatedAt = CURRENT_TIMESTAMP WHERE id = ? `,
  //포트폴리오 삭제
  DELETE_PORTFOLIO: `DELETE FROM Portfolios WHERE id = ?`,
  //포트폴리오 배포 상태 업데이트(공개)
  DEPLOY_PORTFOLIO: `UPDATE Portfolios SET isPublic = true, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
  //포트폴리오 배포 상태 업데이트(비공개)
  UNDEPLOY_PORTFOLIO: `UPDATE Portfolios SET isPublic = false WHERE id = ? AND userId = ?`,
  // publicUrlId로 포트폴리오와 섹션 조회
  FIND_PORTFOLIO_BY_PUBLIC_ID: `SELECT p.*, c.id as categoryId, c.name as categoryName, c.type as categoryType, s.id as sectionId, s.content
    FROM Portfolios p 
    LEFT JOIN Categories c ON p.id = c.portfolioId
    LEFT JOIN Sections s ON c.id = s.categoryId
    WHERE p.publicUrlId = ? AND p.isPublic = true 
    ORDER BY c.sortOrder ASC`,

  //포트폴리오 임시저장
  CREATE_DRAFT: `INSERT INTO Drafts (id,userId,data) VALUES(?,?,?)`,
  FIND_USER_DRAFT: `SELECT * FROM Drafts WHERE userId = ? ORDER BY createdAt DESC LIMIT 1`,
  UPDATE_DRAFT: `UPDATE Drafts SET data = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
  DELETE_DRAFT: `DELETE FROM Drafts WHERE id = ?`,

  //Sections
  //카테고리별 섹션 조회
  FIND_SECTIONS_BY_CATEGORY: `SELECT * FROM Sections WHERE categoryId = ?`,
  // 특정 섹션 조회
  FIND_SECTION_BY_ID: `SELECT * FROM Sections WHERE id = ? AND categoryId = ?`,
  //섹션 생성
  CREATE_SECTION: `INSERT INTO Sections (id,categoryId,content) VALUES(?,?,?)`,
  //섹션 내용 수정
  UPDATE_SECTION_CONTENT: `UPDATE Sections SET content = ? WHERE id = ? AND categoryId = ?`,
  //섹션 순서 재정렬
  REORDER_SECTIONS: `UPDATE Sections SET sortOrder = ? WHERE id = ? AND categoryId = ?`,
  //섹션 삭제
  DELETE_SECTION: `DELETE FROM Sections WHERE categoryId = ?`,

  //category
  CREATE_CATEGORY: `INSERT INTO Categories (id,portfolioId,name,type,sortOrder) VALUES(?,?,?,?,?)`,
  //특정 포트폴리오의 모든 카테고리 조회
  FIND_CATEGORIES_BY_PORTFOLIO: `SELECT * FROM Categories WHERE portfolioId = ? ORDER BY sortOrder ASC`,
  //특정 카테고리 상세 조회
  FIND_CATEGORY_BY_ID: `SELECT * FROM Categories WHERE id = ? AND portfolioId = ?`,
  //카테고리 정보 수정
  UPDATE_CATEGORY: `UPDATE Categories SET name = ? , type = ? WHERE id = ? AND portfolioId = ? `,
  //카테고리 삭제
  DELETE_CATEGORY: `DELETE FROM Categories WHERE id = ? AND portfolioId = ? `,
  //포트폴리오의 마지막 카테고리 순서 조회
  FIND_LAST_CATEGORY_ORDER: `SELECT MAX(sortOrder) as maxOrder FROM Categories WHERE portfolioId = ?`,
  //카테고리 순서 재정렬
  REORDER_CATEGORIES: `UPDATE Categories 
  SET sortOrder = CASE 
      WHEN id = ? THEN ? 
      WHEN id = ? THEN ? 
  END
  WHERE id IN (?, ?) AND portfolioId = ?`,

  // 포트폴리오 전체 정보 조회 (포트폴리오에 대한 모든 정보 반환)
  FIND_PORTFOLIO_WITH_CATEGORIES_AND_SECTIONS: `SELECT p.*,c.id as categoryId,c.name as categoryName,c.type as categoryType,s.id as sectionId,s.content as sectionContent,s.sortOrder as sectionOrder 
  FROM Portfolios p
  LEFT JOIN Categories c ON p.id = c.portfolioId
  LEFT JOIN Sections s ON c.id = s.categoryId
  WHERE p.id = ?
  ORDER BY c.name ASC, s.sortOrder ASC
`,
};
