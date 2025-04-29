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
 *             required:
 *               - title
 *               - sections
 *             properties:
 *               title:
 *                 type: string
 *                 description: 포트폴리오 제목
 *               sections:
 *                 type: array
 *                 description: 섹션 배열
 *                 items:
 *                   type: object
 *                   required:
 *                     - type
 *                     - content
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: 섹션 타입
 *                     content:
 *                       type: object
 *                       description: 섹션 내용
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
 *                   example: "포트폴리오 생성 완료"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     sections:
 *                       type: array
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}/sections/{type}/select:
 *   patch:
 *     summary: 특정 섹션 박스 선택 상태 업데이트
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: 섹션 타입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - selectedBoxTitle
 *             properties:
 *               selectedBoxTitle:
 *                 type: string
 *                 description: 선택할 박스의 제목
 *     responses:
 *       200:
 *         description: 섹션 박스 선택 상태 업데이트 성공
 *       404:
 *         description: 포트폴리오 또는 섹션을 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/portfolios:
 *   get:
 *     summary: 내 포트폴리오 목록 조회
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
 *                   example: "전체 포트폴리오 조회 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolios:
 *                       type: array
 *                       items:
 *                         type: object
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/portfolios/{portfolioId}:
 *   get:
 *     summary: 특정 포트폴리오 상세 조회
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *         description: 포트폴리오 ID
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
 *                   example: "포트폴리오 조회 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     portfolioId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           type:
 *                             type: string
 *                           content:
 *                             type: object
 *                           sortOrder:
 *                             type: integer
 *       404:
 *         description: 포트폴리오를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
