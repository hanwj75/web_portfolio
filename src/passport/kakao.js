import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { findUserByEmail, createUser } from "../db/user/user.db.js";
import config from "../config/config.js";
import CustomError from "../utils/error/customError.js";

const dotKakao = config.social;
passport.use(
  new KakaoStrategy(
    {
      clientID: dotKakao.KAKAO_CLIENT_ID,
      clientSecret: dotKakao.KAKAO_CLIENT_SECRET,
      callbackURL: "/auth/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile._json && profile._json.kakao_account.email;
        const userName = profile.displayName || profile.username || "카카오유저";
        if (!email) {
          return done(new CustomError("카카오 로그인 실패", 400), null);
        }
        //이메일로 유저 조회
        let user = await findUserByEmail(email);
        //없을경우 회원가입
        if (!user) {
          await createUser(email, "SOCIAL", userName);
          user = await findUserByEmail(email);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
