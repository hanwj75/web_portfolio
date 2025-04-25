import envData from "../constants/env.js";

const dotDb = envData.database;

const dbConfig = {
  database: {
    PORTFOLIOS_DB: {
      name: dotDb.DB1_NAME,
      user: dotDb.DB1_USER,
      password: dotDb.DB1_PASSWORD,
      host: dotDb.DB1_HOST,
      port: dotDb.DB1_PORT,
    },
  },
};

export default dbConfig;
