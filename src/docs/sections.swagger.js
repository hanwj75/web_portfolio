/**
 * @swagger
 * /api/sections:
 *   post:
 *     summary: 섹션 생성
 *     description: 카테고리 하위에 섹션(내용)을 생성합니다. (카테고리별 1개만 허용)
 *     tags:
 *       - Sections
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
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: 카테고리 UUID
 *               content:
 *                 type: object
 *                 description: 섹션 내용(JSON)
 *             required:
 *               - categoryId
 *               - content
 *     responses:
 *       201:
 *         description: 섹션 생성 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 섹션 생성 완료
 *                 data:
 *                   type: object
 *                   properties:
 *                     sectionId:
 *                       type: string
 *                       example: "섹션 UUID"
 *                     categoryId:
 *                       type: string
 *                       example: "카테고리 UUID"
 *                     content:
 *                       type: object
 *                       example: { "text": "안녕하세요!" }
 *       400:
 *         description: 필수값 누락
 *       404:
 *         description: 카테고리 없음
 *       409:
 *         description: 이미 섹션이 존재함
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/sections/{categoryId}:
 *   get:
 *     summary: 카테고리별 섹션 단일 조회
 *     description: 카테고리 ID로 해당 카테고리의 섹션(내용)을 조회합니다.
 *     tags:
 *       - Sections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: 카테고리 UUID
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 UUID
 *     responses:
 *       200:
 *         description: 섹션 단일 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 섹션 단일 조회 성공
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "섹션 UUID"
 *                       categoryId:
 *                         type: string
 *                         example: "카테고리 UUID"
 *                       content:
 *                         type: object
 *                         example: { "text": "안녕하세요!" }
 *       400:
 *         description: 카테고리 ID 누락
 *       500:
 *         description: 서버 에러
 */
