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
  CREATE_PORTFOLIO: `INSERT INTO Portfolios (id,userId,title,isPublic,publicUrlId) VALUES(?,?,?,?,?)`,
  FIND_PORTFOLIO_BY_UUID: `SELECT * FROM Portfolios WHERE id = ?`,
  //사용자의 모든 포트폴리오 목록 조회
  FIND_USER_PORTFOLIOS: `SELECT p.*, COUNT(s.id) as sectionCount FROM Portfolios p  LEFT JOIN Sections s ON p.id = s.portfolioId WHERE p.userId = ? GROUP BY p.id`,

  //특정 포트폴리오의 상세 정보 섹션 정보 모두 조회
  FIND_PORTFOLIO_WITH_SECTIONS: `SELECT p.*, s.id as sectionId, s.type, s.content, s.sortOrder FROM Portfolios p LEFT JOIN Sections s ON p.id = s.portfolioId WHERE p.id = ? AND p.userId = ? ORDER BY s.sortOrder ASC`,
  //포트폴리오 삭제
  DELETE_PORTFOLIO: `DELETE FROM Portfolios WHERE id = ?`,
  //포트폴리오 배포 상태 업데이트
  DEPLOY_PORTFOLIO: `UPDATE Portfolios SET isPublic = true, publicUrlId = ?,updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
  // publicUrlId로 포트폴리오와 섹션 조회
  FIND_PORTFOLIO_BY_PUBLIC_ID: `SELECT p.*, s.id as sectionId, s.type, s.content, s.sortOrder FROM Portfolios p LEFT JOIN Sections s ON p.id = s.portfolioId 
WHERE p.publicUrlId = ? AND p.isPublic = true 
ORDER BY s.sortOrder ASC
`,

  //Sections
  FIND_SECTION_BY_TYPE: `SELECT * FROM Sections WHERE portfolioId = ? AND type = ?`,
  CREATE_SECTION: `INSERT INTO Sections (id,portfolioId,type,content,sortOrder) VALUES(?,?,?,?,?)`,
  UPDATE_SECTION_CONTENT: `UPDATE Sections SET content = ? WHERE id = ?`,
  REORDER_SECTIONS: `UPDATE Sections SET sortOrder = ? WHERE id = ?`,
  DELETE_SECTION: `DELETE FROM Sections WHERE id = ?`,
};
