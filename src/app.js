import express from "express";
import cors from "cors";
import config from "./config/config.js";
import initServer from "./init/index.js";
import usersRouter from "./routes/users.router.js";
import portfoliosRouter from "./routes/portfolios.router.js";
import categoriesRouter from "./routes/categories.router.js";
import sectionsRouter from "./routes/sections.router.js";
import { specs, swaggerUi } from "./config/swagger.js";
const app = express();
const { server } = config;

app.use(
  cors({
    origin: ["http://43.203.72.138:3333", "http://localhost:3333", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-portfolio-id"],
  }),
);

app.use(express.json());

// swagger 문서 확인 페이지
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// api 라우터 설정
app.use("/api", [usersRouter, portfoliosRouter, categoriesRouter, sectionsRouter]);

initServer()
  .then(() => {
    app.listen(server.PORT, server.HOST, () => {
      console.log(`Port: ${server.PORT} Host:${server.HOST}`);
    });
  })
  .catch((err) => {
    console.error(`Server Init Error : ${err}`);
    process.exit(1);
  });
