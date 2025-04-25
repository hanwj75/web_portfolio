const testDbConnection = async (pool, dbName) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log(`${dbName} 테스트 쿼리 결과: ${rows[0].result}`);
  } catch (err) {
    console.error(`${dbName} 테스트 쿼리 실행 중 오류 발생:`, err);
  }
};
const testAllConnections = async (pools) => {
  await testDbConnection(pools.PORTFOLIOS_DB, "PORTFOLIOS_DB");
};
export { testDbConnection, testAllConnections };
