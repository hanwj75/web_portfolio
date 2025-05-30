import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import { toCamelCase } from "../../utils/response/transformCase.js";
import CustomError from "../../utils/error/customError.js";

/**
 * @desc 포트폴리오 임시저장
 */

// 사용자의 임시저장 데이터 조회
const findUserDraft = async (userId) => {
  try {
    const [rows] = await pools.PORTFOLIOS_DB.query(SQL_QUERIES.FIND_USER_DRAFT, [userId]);
    return rows[0];
  } catch (err) {
    console.error(`사용자 임시저장 데이터 조회 에러:`, err);
    if (err instanceof CustomError) throw err;
    throw new CustomError("임시저장 데이터 조회 실패", 500);
  }
};

// 임시저장 데이터 업데이트
const updateDraft = async (draftId, data) => {
  try {
    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.UPDATE_DRAFT, [JSON.stringify(data), draftId]);
    return { id: draftId, data };
  } catch (err) {
    console.error(`임시저장 데이터 업데이트 에러:`, err);
    if (err instanceof CustomError) throw err;
    throw new CustomError("임시저장 데이터 업데이트 실패", 500);
  }
};

// 임시저장 데이터 삭제
const deleteDraft = async (draftId) => {
  try {
    await pools.PORTFOLIOS_DB.query(SQL_QUERIES.DELETE_DRAFT, [draftId]);
  } catch (err) {
    console.error(`임시저장 데이터 삭제 에러:`, err);
    if (err instanceof CustomError) throw err;
    throw new CustomError("임시저장 데이터 삭제 실패", 500);
  }
};

export const createDraft = async ({ userId, data }) => {
  try {
    // 기존 임시저장 데이터 확인
    const existingDraft = await findUserDraft(userId);

    if (existingDraft) {
      // 기존 데이터가 있으면 업데이트
      console.log(`기존 임시저장 데이터 업데이트: ${existingDraft.id}`);
      return await updateDraft(existingDraft.id, data);
    } else {
      // 기존 데이터가 없으면 새로 생성
      const id = uuidv4();
      console.log(`새로운 임시저장 데이터 생성: ${id}`);
      await pools.PORTFOLIOS_DB.query(SQL_QUERIES.CREATE_DRAFT, [id, userId, JSON.stringify(data)]);
      return { id, userId, data };
    }
  } catch (err) {
    console.error(`포트폴리오 임시저장 에러:`, err);
    if (err instanceof CustomError) throw err;
    throw new CustomError("포트폴리오 임시저장 에러", 500);
  }
};
