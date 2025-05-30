export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "서버 에러";
  console.error(`[ERROR] ${status} ${message}`);
  res.status(status).json({ message });
}
