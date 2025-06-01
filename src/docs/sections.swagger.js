/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: 섹션 관리 API
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories/{categoryId}/sections:
 *   post:
 *     summary: 섹션 생성
 *     description: 특정 카테고리에 섹션을 생성합니다.
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 카테고리 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: object
 *                 description: 섹션 내용 (카테고리 타입에 따라 구조가 다름)
 *     responses:
 *       201:
 *         description: 섹션 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "섹션 생성 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     sectionId:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     content:
 *                       type: object
 *       400:
 *         description: 필수값 누락 또는 유효성 검사 실패
 *       404:
 *         description: 카테고리를 찾을 수 없음
 *       409:
 *         description: 이미 섹션이 존재함
 */

/**
 * @swagger
 * /api/portfolios/categories/{categoryId}/sections:
 *   get:
 *     summary: 카테고리별 섹션 조회
 *     description: 특정 카테고리에 속한 모든 섹션을 조회합니다.
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 카테고리 ID
 *     responses:
 *       200:
 *         description: 섹션 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "섹션 조회 성공"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       content:
 *                         type: object
 *       400:
 *         description: 카테고리 ID가 제공되지 않음
 *       404:
 *         description: 카테고리를 찾을 수 없음
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories/{categoryId}/sections/{sectionId}:
 *   patch:
 *     summary: 섹션 내용 수정
 *     description: 특정 섹션의 내용을 수정합니다.
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 카테고리 ID
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: 섹션 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: object
 *                 description: 업데이트할 섹션 내용
 *     responses:
 *       200:
 *         description: 섹션 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "섹션 업데이트 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     content:
 *                       type: object
 *       400:
 *         description: 필수값 누락 또는 유효성 검사 실패
 *       404:
 *         description: 카테고리 또는 섹션을 찾을 수 없음
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
