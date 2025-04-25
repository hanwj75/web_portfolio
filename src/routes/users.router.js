import express from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../db/user/user.db.js";
import bcrypt from "bcrypt";
import { validateSignUp } from "../middlewares/validate.middleware.js";

const router = express.Router();

/**
 * @desc 회원가입 API
 */
router.post("/sign-up", validateSignUp, async (req, res, next) => {
  try {
    const { email, password, passwordCheck, userName } = req.body;
    // 이메일 조회
    const emailCheck = await findUserByEmail(email);

    //유효성 검사
    if (emailCheck) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
      return res.status(409).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원가입
    await createUser(email, hashedPassword, userName);

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      email,
      userName,
    });
  } catch (err) {
    console.error(`회원가입 에러${err}`, err);
    return res.status(500).json({ message: "회원가입 에러" });
  }
});

/**
 * @desc 로그인 API
 */

/**
 * @desc 회원정보 수정 API
 */

/**
 * @desc 회원탈퇴 API
 */

export default router;
