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
  google: {
    GOOGLE_CLIENT_ID: envData.google.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: envData.google.GOOGLE_CLIENT_SECRET,
    SESSION_SECRET_KEY: envData.google.SESSION_SECRET_KEY,
  },
};

export default config;
