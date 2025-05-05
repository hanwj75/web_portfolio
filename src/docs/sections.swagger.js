/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: 포트폴리오 섹션 관리 API
 */

/**
 * @swagger
 * /api/sections:
 *   post:
 *     summary: 섹션 생성
 *     description: 새로운 섹션을 생성합니다.
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID (형식 제한 없음)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - content
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "category123"
 *               content:
 *                 type: object
 *                 properties:
 *                   contentTitle:
 *                     type: string
 *                   shortIntro:
 *                     type: string
 *     responses:
 *       201:
 *         description: 섹션 생성 성공
 *       400:
 *         description: 필수값 누락 또는 유효성 검사 실패
 */

/**
 * @swagger
 * /api/sections/{categoryId}:
 *   get:
 *     summary: 카테고리별 섹션 조회
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 카테고리 ID (형식 제한 없음)
 *     responses:
 *       200:
 *         description: 조회 성공
 */

/**
 * @swagger
 * /api/sections/{sectionId}:
 *   patch:
 *     summary: 섹션 수정
 *     tags: [Sections]
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: 섹션 ID
 *     responses:
 *       200:
 *         description: 수정 성공
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 */
