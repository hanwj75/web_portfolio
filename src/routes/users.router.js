import express from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserByUUID,
  updateUserData,
  updateUserLogin,
} from "../db/user/user.db.js";
import bcrypt from "bcrypt";
import { validateSignUp } from "../middlewares/validate.middleware.js";
import config from "../config/config.js";
import { jwtMiddleware } from "../middlewares/auth.middleware.js";

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

router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 이메일 조회
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    }

    // 비밀번호 확인
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    //토큰 발급
    const { JWT } = config.server;
    const token = jwt.sign({ id: user.id }, JWT, { expiresIn: "30m" });
    res.setHeader("Authorization", `Bearer ${token}`);

    //로그인 정보 갱신
    await updateUserLogin(email);
    return res.status(200).json({
      message: "로그인 성공",
      email,
      userName: user.userName,
      token,
    });
  } catch (err) {
    console.error(`로그인 에러${err}`, err);
    return res.status(500).json({ message: "로그인 에러" });
  }
});

/**
 * @desc 회원정보 수정 API
 */

router.patch("/users/me", jwtMiddleware, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword, newName } = req.body;

    const user = await findUserByUUID(id);

    //필수 필드 검증
    if (!currentPassword) {
      return res.status(400).json({ message: "현재 비밀번호는 필수입니다." });
    }
    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 유저입니다." });
    }

    //현재 비밀번호 확인
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    //업데이트 데이터 준비
    const updateFields = {};
    if (newPassword) updateFields.password = newPassword;
    if (newName !== undefined) updateFields.userName = newName; // 빈 문자열 허용
    //데이터 업데이트
    await updateUserData(id, updateFields);

    //업데이트된 사용자 정보 조회
    const updatedUser = await findUserByUUID(id);

    return res.status(200).json({
      message: "회원정보 수정 완료",
      userName: updatedUser.userName,
    });
  } catch (err) {
    console.error(`회원정보 수정 에러${err}`, err);
    return res.status(500).json({ message: "회원정보 수정 에러" });
  }
});

/**
 * @desc 회원탈퇴 API
 */

router.delete("/users/me", jwtMiddleware, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { password } = req.body;
    const user = await findUserByUUID(id);
    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 유저입니다." });
    }
    // 비밀번호 확인
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }
    if (id !== user.id) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }
    await deleteUser(id);
    return res.status(200).json({ message: "회원탈퇴 완료" });
  } catch (err) {
    console.error(`회원탈퇴 에러${err}`, err);
    return res.status(500).json({ message: "회원탈퇴 에러" });
  }
});

export default router;
