import envData from "../constants/env.js";

const dotServer = envData.server;
const config = {
  server: {
    PORT: dotServer.PORT,
    HOST: dotServer.HOST,
    JWT: dotServer.JWT,
  },
  development: {
    NODE_ENV: envData.development.NODE_ENV,
  },
  social: {
    GOOGLE_CLIENT_ID: envData.social.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: envData.social.GOOGLE_CLIENT_SECRET,
    SESSION_SECRET_KEY: envData.social.SESSION_SECRET_KEY,
    KAKAO_CLIENT_ID: envData.social.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: envData.social.KAKAO_CLIENT_SECRET,
  },
};

export default config;
