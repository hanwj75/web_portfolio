import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Portfolio API 문서",
      version: "1.0.0",
      description: "포트폴리오 제작 관련 기능 API 문서입니다.",
    },
    servers: [
      {
        url: "http://158.179.174.153:3333",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // JWT 토큰 형식
        },
      },
    },
    security: [
      {
        bearerAuth: [], // 모든 API에 기본적으로 JWT 인증을 요구
      },
    ],
  },
  apis: ["./src/docs/users.swagger.js", "./src/docs/portfolios.swagger.js"],
};

const specs = swaggerJsdoc(options);
export { swaggerUi, specs };
