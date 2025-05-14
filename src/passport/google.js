import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findUserByEmail, createUser, findUserByUUID } from "../db/user/user.db.js";
import config from "../config/config.js";
import CustomError from "../utils/error/customError.js";

const dotGoogle = config.social;
passport.use(
  new GoogleStrategy(
    {
      clientID: dotGoogle.GOOGLE_CLIENT_ID,
      clientSecret: dotGoogle.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //profile에서 이메일, 이름 등 추출
        const email = profile.emails[0].value;
        if (!email) {
          return done(new CustomError("구글 계정에 이메일이 없습니다.", 400), null);
        }
        let user = await findUserByEmail(email);
        if (!user) {
          user = await createUser(email, "SOCIAL", profile.displayName);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await findUserByUUID(id);

  done(null, id);
});
