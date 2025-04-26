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
    // 1. 필수 매개변수 검증
    if (!id || typeof id !== "string") {
      throw new Error("유효하지 않은 사용자 ID입니다");
    }
    if (!updateData || typeof updateData !== "object") {
      throw new Error("업데이트 데이터가 제공되지 않았습니다");
    }

    // 2. 실제 업데이트할 데이터 확인
    const hasUserName = updateData.userName !== undefined && updateData.userName !== "";
    const hasPassword = updateData.password !== undefined && updateData.password !== "";

    if (!hasUserName && !hasPassword) {
      throw new Error("userName 또는 password 중 최소 하나는 제공해야 합니다");
    }

    //비밀번호 해싱
    let hashedPassword;
    if (hasPassword) {
      hashedPassword = await bcrypt.hash(updateData.password, 10);
    }

    // 상황에 맞는 쿼리 실행
    let result;
    if (hasUserName && hasPassword) {
      //1.모두 업데이트
      result = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_USER_ALL, [
        updateData.userName,
        hashedPassword,
        id,
      ]);
    } else if (hasUserName) {
      //2.이름만 업데이트
      result = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_USER_NAME, [
        updateData.userName,
        id,
      ]);
    } else if (hasPassword) {
      //3.비밀번호만 업데이트
      result = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_USER_PASSWORD, [
        hashedPassword,
        id,
      ]);
    }
    const [rows] = result;
    return rows;
  } catch (err) {
    console.error(`유저 데이터 수정 에러${err}`, err);
  }
};

export const deleteUser = async (id) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DELETE_USER, [id]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error(`유저 삭제 에러${err}`, err);
  }
};

export const updateUserLogin = async (email) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [email]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error(`유저 로그인 정보 수정 에러${err}`, err);
  }
};
// FIND_USER_BY_UUID: `SELECT * FROM Users WHERE id = ?`,
// FIND_USER_BY_EMAIL: `SELECT * FROM Users WHERE email = ?`,
// FIND_USER_BY_NAME: `SELECT * FROM Users WHERE userName = ?`,
// CREATE_USER: `INSERT INTO Users (email, password, userName) VALUES ( ?, ?, ?)`,
// UPDATE_USER_LOGIN: `UPDATE Users SET updatedAt = CURRENT_TIMESTAMP WHERE email = ?`,
// DELETE_USER: `DELETE FROM Users WHERE email = ?`,
