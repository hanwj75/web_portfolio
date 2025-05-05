/**
 * @swagger
 * tags:
 *   name: Portfolios
 *   description: 포트폴리오 관리 API
 */

/**
 * @swagger
 * /api/portfolios:
 *   post:
 *     summary: 포트폴리오 생성
 *     description: 새로운 포트폴리오를 생성합니다.
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 포트폴리오 제목
 *                 example: "나의 첫 포트폴리오"
 *     responses:
 *       201:
 *         description: 포트폴리오 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "포트폴리오 생성 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "나의 첫 포트폴리오"
 *                     publicUrlId:
 *                       type: string
 *                       example: "abc123"
 *                     isPublic:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/{publicUrlId}:
 *   get:
 *     summary: 포트폴리오 조회 (비로그인)
 *     description: 공개된 포트폴리오를 조회합니다.
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: publicUrlId
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 공개 URL ID
 *     responses:
 *       200:
 *         description: 포트폴리오 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "포트폴리오 조회 완료"
 *                 data:
 *                   $ref: '#/components/schemas/Portfolio'
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/deploy:
 *   patch:
 *     summary: 포트폴리오 공개 설정
 *     description: 포트폴리오를 공개 상태로 설정합니다.
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *     responses:
 *       200:
 *         description: 포트폴리오 공개 설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "포트폴리오 공개 설정 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: integer
 *                       example: 1
 *                     isPublic:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/undeploy:
 *   patch:
 *     summary: 포트폴리오 비공개 설정
 *     description: 포트폴리오를 비공개 상태로 설정합니다.
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *     responses:
 *       200:
 *         description: 포트폴리오 비공개 설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "포트폴리오 비공개 설정 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: integer
 *                       example: 1
 *                     isPublic:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Portfolio:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "나의 포트폴리오"
 *         publicUrlId:
 *           type: string
 *           example: "abc123"
 *         isPublic:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
