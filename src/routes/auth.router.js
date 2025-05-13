import express from "express";
import passport from "passport";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  (req, res, next) => {
    //JWT 발급
    const { JWT } = config.server;
    const token = jwt.sign({ id: req.user.id }, JWT, { expiresIn: "30m" });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      message: "소셜 로그인 성공",
      email: req.user.email,
      userName: req.user.userName,
      token,
    });
  },
);

export default router;
