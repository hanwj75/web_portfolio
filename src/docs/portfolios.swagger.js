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
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "나의 포트폴리오"
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     publicUrlId:
 *                       type: string
 *                     isPublic:
 *                       type: boolean
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios:
 *   patch:
 *     summary: 포트폴리오 제목 수정
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "수정된 포트폴리오 제목"
 *     responses:
 *       200:
 *         description: 포트폴리오 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                     title:
 *                       type: string
 *       400:
 *         description: 잘못된 요청
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios:
 *   get:
 *     summary: 현재 사용자 포트폴리오 목록 조회
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 포트폴리오 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Portfolio'
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/{publicUrlId}:
 *   get:
 *     summary: 포트폴리오 조회 (비로그인)
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: publicUrlId
 *         schema:
 *           type: string
 *         required: true
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
 * /api/portfolios/{publicUrlId}/categories/{categoryId}:
 *   get:
 *     summary: 포트폴리오 카테고리별 조회
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: publicUrlId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 포트폴리오 카테고리별 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CategoryWithSections'
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/deploy:
 *   patch:
 *     summary: 포트폴리오 공개 설정
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                     isPublic:
 *                       type: boolean
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
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                     isPublic:
 *                       type: boolean
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}:
 *   delete:
 *     summary: 포트폴리오 삭제
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 포트폴리오 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *       400:
 *         description: 잘못된 요청
 *       403:
 *         description: 권한 없음
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
 *           type: string
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         publicUrlId:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CategoryWithSections:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         portfolioId:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         sortOrder:
 *           type: number
 *         sections:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Section'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         categoryId:
 *           type: string
 *         content:
 *           type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
