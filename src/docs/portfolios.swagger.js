/**
 * @swagger
 * /api/portfolios:
 *   post:
 *     summary: 포트폴리오 생성
 *     description: 새로운 포트폴리오를 생성합니다. publicUrlId는 항상 생성되며, isPublic은 기본값 false입니다.
 *     tags:
 *       - Portfolios
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
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: 포트폴리오 생성 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 포트폴리오 생성 완료
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                       example: "포트폴리오 UUID"
 *                     title:
 *                       type: string
 *                       example: "내 포트폴리오"
 *                     publicUrlId:
 *                       type: string
 *                       example: "a1b2c3d4"
 *                     isPublic:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: 잘못된 요청(필수값 누락)
 *       500:
 *         description: 서버 에러
 */
