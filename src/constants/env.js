import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const envData = {
  server: {
    PORT: env.PORT || 3000,
    HOST: env.HOST || "127.0.0.1",
    JWT: env.JWT || "JWT_SECRET_KEY",
  },
  database: {
    DB1_NAME: env.DB1_NAME || "DB_NAME",
    DB1_USER: env.DB1_USER || "DB_USER",
    DB1_PASSWORD: env.DB1_PASSWORD || "DB_PASSWORD",
    DB1_HOST: env.DB1_HOST || "DB_HOST",
    DB1_PORT: env.DB1_PORT || "DB_PORT",
  },
  development: {
    NODE_ENV: env.NODE_ENV,
  },
};

export default envData;
