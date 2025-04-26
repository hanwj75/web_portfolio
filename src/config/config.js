import envData from "../constants/env.js";

const dotServer = envData.server;
const config = {
  server: {
    PORT: dotServer.PORT,
    HOST: dotServer.HOST,
    JWT: dotServer.JWT,
  },
};

export default config;
