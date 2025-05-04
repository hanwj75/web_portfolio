/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 카테고리 UUID
 *         name:
 *           type: string
 *           description: 카테고리 이름
 *         type:
 *           type: string
 *           enum: [profile, project]
 *           description: 카테고리 타입
 *         sortOrder:
 *           type: number
 *           description: 카테고리 정렬 순서
 *         portfolioId:
 *           type: string
 *           description: 포트폴리오 UUID
 *
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: 카테고리 생성
 *     description: 새로운 카테고리를 생성합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: 카테고리 이름
 *               type:
 *                 type: string
 *                 enum: [profile, project]
 *                 description: 카테고리 타입
 *     responses:
 *       201:
 *         description: 카테고리 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카테고리 생성 완료
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       409:
 *         description: 카테고리 중복
 *       500:
 *         description: 서버 에러
 *
 *   get:
 *     tags: [Categories]
 *     summary: 카테고리 목록 조회 (로그인)
 *     description: 포트폴리오의 모든 카테고리를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *     responses:
 *       200:
 *         description: 카테고리 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카테고리 조회 완료
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 *
 * /portfolios/categories:
 *   get:
 *     tags: [Categories]
 *     summary: 카테고리 목록 조회 (비로그인)
 *     description: 포트폴리오의 모든 카테고리를 비로그인 상태로 조회합니다.
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *     responses:
 *       200:
 *         description: 카테고리 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카테고리 조회 완료
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */
