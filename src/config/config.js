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
};

export default config;
