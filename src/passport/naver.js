import passport from "passport";
import { Strategy as NaverStrategy } from "passport-naver";
import { findUserByEmail, createUser } from "../db/user/user.db.js";
import config from "../config/config.js";
import CustomError from "../utils/error/customError.js";
const dotNaver = config.social;
passport.use(
  new NaverStrategy(
    {
      clientID: dotNaver.NAVER_CLIENT_ID,
      clientSecret: dotNaver.NAVER_CLIENT_SECRET,
      callbackURL: "/auth/naver/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0].value;
        const userName =
          (profile._json && profile._json.nickname) ||
          profile.displayName ||
          profile.username ||
          "네이버유저";
        console.log(userName);
        if (!email) {
          return done(new CustomError("네이버 계정에 이메일이 없습니다.", 400), null);
        }

        let user = await findUserByEmail(email);
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
