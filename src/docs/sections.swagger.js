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
 *           format: uuid
 *         description: 포트폴리오 UUID
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
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8"
 *               content:
 *                 type: object
 *                 properties:
 *                   contentTitle:
 *                     type: string
 *                   shortIntro:
 *                     type: string
 *                   contact:
 *                     type: object
 *                     properties:
 *                       phone:
 *                         type: string
 *                       email:
 *                         type: string
 *                       birthDate:
 *                         type: string
 *                   information:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         period:
 *                           type: string
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         level:
 *                           type: number
 *                         description:
 *                           type: string
 *                   aboutMe:
 *                     type: array
 *                     items:
 *                       type: string
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
 *                       format: uuid
 *                     categoryId:
 *                       type: string
 *                       format: uuid
 *                     content:
 *                       type: object
 *       400:
 *         description: |
 *           잘못된 요청:
 *           - 필수값 누락
 *           - 유효하지 않은 타입
 *           - 배열이 아닌 값 전송
 *       404:
 *         description: 카테고리를 찾을 수 없음
 *       409:
 *         description: 이미 섹션이 존재함
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/sections/{categoryId}:
 *   get:
 *     summary: 카테고리별 섹션 조회
 *     description: 특정 카테고리에 속한 섹션을 조회합니다.
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 카테고리 UUID
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
 *                     $ref: '#/components/schemas/Section'
 *       400:
 *         description: 카테고리 ID 누락
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/sections/{sectionId}:
 *   patch:
 *     summary: 섹션 내용 수정
 *     description: 기존 섹션의 내용을 업데이트합니다.
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 포트폴리오 UUID
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 섹션 UUID
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
 *                 format: uuid
 *               content:
 *                 type: object
 *                 properties:
 *                   contentTitle:
 *                     type: string
 *                   projects:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         projectName:
 *                           type: string
 *                         logoImage:
 *                           type: string
 *                         projectDescription:
 *                           type: string
 *                         date:
 *                           type: string
 *                         stacks:
 *                           type: array
 *                           items:
 *                             type: string
 *                         projectImage:
 *                           type: string
 *                         Participation:
 *                           type: number
 *     responses:
 *       200:
 *         description: 섹션 수정 성공
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
 *                       format: uuid
 *                     categoryId:
 *                       type: string
 *                       format: uuid
 *                     content:
 *                       type: object
 *       400:
 *         description: |
 *           잘못된 요청:
 *           - 필수값 누락
 *           - 유효하지 않은 데이터 형식
 *       404:
 *         description: |
 *           찾을 수 없음:
 *           - 카테고리 없음
 *           - 섹션 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         categoryId:
 *           type: string
 *           format: uuid
 *         content:
 *           type: object
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
