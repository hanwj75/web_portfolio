/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: 카테고리 생성
 *     description: 포트폴리오에 소속된 카테고리를 생성합니다. name, type만 저장하며, 응답에 slug가 포함됩니다.
 *     tags:
 *       - Categories
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
 *               name:
 *                 type: string
 *                 description: 카테고리 이름
 *               type:
 *                 type: string
 *                 enum: [profile, project]
 *                 description: 카테고리 타입
 *             required:
 *               - name
 *               - type
 *     responses:
 *       201:
 *         description: 카테고리 생성 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 카테고리 생성 완료
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example: "카테고리 UUID"
 *                     name:
 *                       type: string
 *                       example: "Home&Intro"
 *                     type:
 *                       type: string
 *                       example: "profile"
 *                     slug:
 *                       type: string
 *                       example: "home-intro"
 *       400:
 *         description: 잘못된 요청(필수값 누락)
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: 포트폴리오의 모든 카테고리 조회
 *     description: 포트폴리오에 소속된 모든 카테고리를 조회합니다. 각 카테고리의 name을 케밥케이스로 변환한 slug가 포함됩니다.
 *     tags:
 *       - Categories
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
 *         description: 카테고리 조회 완료
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "카테고리 UUID"
 *                       name:
 *                         type: string
 *                         example: "Home&Intro"
 *                       type:
 *                         type: string
 *                         example: "profile"
 *                       slug:
 *                         type: string
 *                         example: "home-intro"
 *       400:
 *         description: 잘못된 요청(필수값 누락)
 *       500:
 *         description: 서버 에러
 */
