import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findUserByEmail, createUser, findUserByUUID } from "../db/user/user.db.js";
import config from "../config/config.js";

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
