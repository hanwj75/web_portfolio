import express from "express";
import cors from "cors";
import config from "./config/config.js";
import initServer from "./init/index.js";
import usersRouter from "./routes/users.router.js";
import portfoliosRouter from "./routes/portfolios.router.js";
import categoriesRouter from "./routes/categories.router.js";
import sectionsRouter from "./routes/sections.router.js";
import authRouter from "./routes/auth.router.js";
import { specs, swaggerUi } from "./config/swagger.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import session from "express-session";
import passport from "passport";
import "./passport/google.js";
import "./passport/kakao.js";
import "./passport/naver.js";

const app = express();
const { server, social } = config;

app.use(
  cors({
    origin: [
      "http://43.203.72.138:3333",
      "http://localhost:3333",
      "http://localhost:3000",
      "http://wojong.shop:3333",
      "http://wojong.shop:3000",
    ],
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

//구글 소셜 로그인
app.use(
  session({
    secret: social.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, //https환경이라면 true
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);

//에러처리
app.use(errorHandler);
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
