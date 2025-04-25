import bcrypt from "bcrypt";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";
import { v4 as uuidv4 } from "uuid";

/**
 * @desc 유저 생성, 조회, 수정, 삭제, 로그인 등
 */

// const duplicateQuery = async (query, params) => {
//   try {
//     const [rows] = await pools.PORTFOLIOS_DB.query(query, params);
//     return rows.length ? toCamelCase(rows[0]) : null;
//   } catch (err) {
//     console.error(`중복 쿼리 실행 에러${query}`, err);
//     throw new Error(`중복 쿼리 실행 에러:${err.message}`);
//   }
// };
// const affectedRowsQuery = async (query, params) => {
//   const [result] = await pools.PORTFOLIOS_DB.query(query, params);
//   return result.affectedRows > 0;
// };

export const createUser = async (email, password, userName) => {
  try {
    const id = uuidv4();
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_USER, [
      id,
      email,
      password,
      userName,
    ]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`회원가입 에러${err}`, err);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_BY_EMAIL, [email]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`이메일 조회 에러${err}`, err);
  }
};

export const findUserByUUID = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_BY_UUID, [id]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`유저 UUID 조회 에러${err}`, err);
  }
};

export const findUserByName = async (userName) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_BY_NAME, [userName]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`유저 이름 조회 에러${err}`, err);
  }
};

export const updateUserData = async (id, updateData) => {
  try {
    const updateFields = {};
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateFields.password = hashedPassword;
    }
    if (updateData.userName) {
      updateFields.userName = updateData.userName;
    }

    if (Object.keys(updateFields).length === 0) return false;
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_USER_DATA, [
      updateFields,
      id,
    ]);
  } catch (err) {
    console.error(`유저 데이터 수정 에러${err}`, err);
  }
};

// FIND_USER_BY_UUID: `SELECT * FROM Users WHERE id = ?`,
// FIND_USER_BY_EMAIL: `SELECT * FROM Users WHERE email = ?`,
// FIND_USER_BY_NAME: `SELECT * FROM Users WHERE userName = ?`,
// CREATE_USER: `INSERT INTO Users (email, password, userName) VALUES ( ?, ?, ?)`,
// UPDATE_USER_LOGIN: `UPDATE Users SET updatedAt = CURRENT_TIMESTAMP WHERE email = ?`,
// DELETE_USER: `DELETE FROM Users WHERE email = ?`,
