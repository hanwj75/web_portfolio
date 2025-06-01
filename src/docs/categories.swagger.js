/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: 포트폴리오 카테고리 관리 API
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories:
 *   post:
 *     summary: 카테고리 생성
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "프로필"
 *               type:
 *                 type: string
 *                 enum: [profile, project]
 *                 example: "profile"
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
 *                   example: "카테고리 생성 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     sortOrder:
 *                       type: number
 *       400:
 *         description: 유효성 검사 실패
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories:
 *   get:
 *     summary: 포트폴리오의 모든 카테고리 조회 (비로그인 가능)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: portfolioId
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
 *                   example: "카테고리 조회 완료"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       404:
 *         description: 포트폴리오 없음
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories/reorder:
 *   patch:
 *     summary: 카테고리 순서 재정렬
 *     tags: [Categories]
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
 *               firstCategoryId:
 *                 type: string
 *               secondCategoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 순서 변경 성공
 *       400:
 *         description: 필수값 누락
 *       404:
 *         description: 카테고리 조회 실패
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories/{categoryId}:
 *   patch:
 *     summary: 카테고리 수정
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
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
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [profile, project]
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
 *                     categoryId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     isSectionReset:
 *                       type: boolean
 *       404:
 *         description: 카테고리 없음
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/categories/{categoryId}:
 *   delete:
 *     summary: 카테고리 삭제
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
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
 *         description: 삭제 성공
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
 *                     categoryId:
 *                       type: string
 *       404:
 *         description: 카테고리 없음
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         sortOrder:
 *           type: number
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
