import envData from "../constants/env.js";

const dotServer = envData.server;
const config = {
  server: {
    PORT: dotServer.PORT,
    HOST: dotServer.HOST,
  },
};

export default config;
