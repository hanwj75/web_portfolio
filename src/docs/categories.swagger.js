/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: 카테고리 관리 API
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: 카테고리 생성
 *     tags: [Categories]
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
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "프로젝트"
 *               type:
 *                 type: string
 *                 enum: [profile, project]
 *                 example: "project"
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
 *         description: 잘못된 요청
 *       409:
 *         description: 카테고리 중복
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: 포트폴리오의 모든 카테고리 조회 (로그인)
 *     tags: [Categories]
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
 *         description: 카테고리 조회 성공
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
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/portfolios/categories:
 *   get:
 *     summary: 포트폴리오의 모든 카테고리 조회 (비로그인)
 *     tags: [Categories]
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/categories/reorder:
 *   patch:
 *     summary: 카테고리 순서 재정렬
 *     tags: [Categories]
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
 *             required: [firstCategoryId, secondCategoryId]
 *             properties:
 *               firstCategoryId:
 *                 type: string
 *               secondCategoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 카테고리 순서 재정렬 성공
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
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리 조회 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   patch:
 *     summary: 카테고리 수정
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "수정된 카테고리 이름"
 *               type:
 *                 type: string
 *                 enum: [profile, project]
 *                 example: "project"
 *     responses:
 *       200:
 *         description: 카테고리 수정 성공
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
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리 조회 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: 카테고리 삭제
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
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
 *         description: 카테고리 삭제 성공
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
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리 조회 실패
 *       500:
 *         description: 서버 오류
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
 *         portfolioId:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [profile, project]
 *         sortOrder:
 *           type: number
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
