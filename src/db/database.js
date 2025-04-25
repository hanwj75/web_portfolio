import mysql from "mysql2/promise";
import { formatDate } from "../utils/response/dateFormatter.js";
import dbConfig from "../config/dbConfig.js";

const { database } = dbConfig;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();
    // 쿼리 실행시 로그
    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`,
    );
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

// 여러 데이터베이스 커넥션 풀 생성
const pools = {
  PORTFOLIOS_DB: createPool(database.PORTFOLIOS_DB),
};

export default pools;
