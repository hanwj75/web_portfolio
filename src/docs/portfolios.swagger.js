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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "나의 첫 포트폴리오"
 *     responses:
 *       201:
 *         description: 생성 성공
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
 *                       type: string
 *                     title:
 *                       type: string
 *                     publicUrlId:
 *                       type: string
 *                     isPublic:
 *                       type: boolean
 *       400:
 *         description: 제목 누락
 */

/**
 * @swagger
 * /api/portfolios/draft/start:
 *   post:
 *     summary: 포트폴리오 임시저장 시작
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 임시저장 시작 성공
 */

/**
 * @swagger
 * /api/portfolios/draft:
 *   patch:
 *     summary: 포트폴리오 임시저장 업데이트
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 업데이트 성공
 */

/**
 * @swagger
 * /api/portfolios/draft:
 *   get:
 *     summary: 포트폴리오 임시저장 조회
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 */

/**
 * @swagger
 * /api/portfolios/draft:
 *   delete:
 *     summary: 포트폴리오 임시저장 종료
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 종료 성공
 */

/**
 * @swagger
 * /api/portfolios/draft/save:
 *   post:
 *     summary: 포트폴리오 수동 저장
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 저장 성공
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}:
 *   patch:
 *     summary: 포트폴리오 제목 수정
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "수정된 제목"
 *     responses:
 *       200:
 *         description: 수정 성공
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
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 포트폴리오 없음
 */

/**
 * @swagger
 * /api/portfolios:
 *   get:
 *     summary: 사용자 포트폴리오 목록 조회 (로그인 필요)
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
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
 */

/**
 * @swagger
 * /api/portfolios/{publicUrlId}:
 *   get:
 *     summary: 포트폴리오 전체 조회 (공개 URL)
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: publicUrlId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: 포트폴리오 없음
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
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
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
 *         description: 파라미터 누락
 */

/**
 * @swagger
 * /api/portfolios/{publicUrlId}/categories/order/{sortOrder}:
 *   get:
 *     summary: 포트폴리오 정렬순서로 조회
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: publicUrlId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sortOrder
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CategoryWithSections'
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/deploy:
 *   patch:
 *     summary: 포트폴리오 공개 설정
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 공개 설정 성공
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
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/undeploy:
 *   patch:
 *     summary: 포트폴리오 비공개 설정
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 비공개 설정 성공
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
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 포트폴리오 없음
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
 *         title:
 *           type: string
 *         publicUrlId:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CategoryWithSections:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         sections:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Section'
 *
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *         content:
 *           type: object
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
