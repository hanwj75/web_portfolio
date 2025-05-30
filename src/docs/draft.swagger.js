/**
 * @swagger
 * components:
 *   schemas:
 *     PortfolioDraft:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: 포트폴리오 데이터
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 마지막 업데이트 시간
 *         status:
 *           type: string
 *           enum: [editing, saved]
 *           description: 저장 상태
 *     AutoSaveResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         autoSaveEnabled:
 *           type: boolean
 *     DraftStatusResponse:
 *       type: object
 *       properties:
 *         exists:
 *           type: boolean
 *         data:
 *           type: object
 *           nullable: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         expiresIn:
 *           type: number
 *           nullable: true
 *         status:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * api/portfolios/draft/start:
 *   post:
 *     summary: 포트폴리오 임시저장 시작
 *     description: Redis에 임시 저장 시작 및 자동 저장 타이머 설정
 *     tags: [Portfolio Draft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { title: "포트폴리오 제목", content: "내용" }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutoSaveResponse'
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 에러
 */
/**
 * @swagger
 * api/portfolios/draft:
 *   patch:
 *     summary: 포트폴리오 임시저장 업데이트
 *     description: Redis 데이터 업데이트 및 타이머 갱신
 *     tags: [Portfolio Draft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { title: "수정 제목", content: "수정 내용" }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: 임시저장 데이터 없음
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * api/portfolios/draft:
 *   get:
 *     summary: 임시저장 포트폴리오 조회
 *     description: Redis에 저장된 현재 작업중인 포트폴리오 조회
 *     tags: [Portfolio Draft]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DraftStatusResponse'
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * api/portfolios/draft:
 *   delete:
 *     summary: 포트폴리오 임시저장 종료
 *     description: Redis 데이터 삭제 및 타이머 정지
 *     tags: [Portfolio Draft]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutoSaveResponse'
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * api/portfolios/draft/save:
 *   post:
 *     summary: 포트폴리오 수동 임시저장
 *     description: Redis 데이터를 DB에 즉시 저장하고 타이머 갱신
 *     tags: [Portfolio Draft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { title: "최종 제목", content: "최종 내용" }
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 data:
 *                   type: object
 *       404:
 *         description: 저장할 데이터 없음
 *       500:
 *         description: 서버 에러
 */
