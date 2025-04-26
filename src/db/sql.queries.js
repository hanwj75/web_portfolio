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

  //Sections
};
