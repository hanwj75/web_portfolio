/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: 섹션 관리 API
 */

/**
 * @swagger
 * /api/sections:
 *   post:
 *     summary: 섹션 생성
 *     tags: [Sections]
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
 *             required: [categoryId, content]
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "카테고리 UUID"
 *               content:
 *                 type: object
 *                 oneOf:
 *                   - $ref: '#/components/schemas/ProfileContent'
 *                   - $ref: '#/components/schemas/ProjectContent'
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
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리 존재하지 않음
 *       409:
 *         description: 이미 섹션이 존재함
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/sections/{categoryId}:
 *   get:
 *     summary: 카테고리별 전체 섹션 조회
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Section'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/sections/{sectionId}:
 *   patch:
 *     summary: 섹션 수정
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-portfolio-id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: sectionId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [categoryId, content]
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "카테고리 UUID"
 *               content:
 *                 type: object
 *                 oneOf:
 *                   - $ref: '#/components/schemas/ProfileContent'
 *                   - $ref: '#/components/schemas/ProjectContent'
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
 *         description: 잘못된 요청
 *       404:
 *         description: 카테고리 또는 섹션 존재하지 않음
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
 *         categoryId:
 *           type: string
 *         content:
 *           type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProfileContent:
 *       type: object
 *       required:
 *         - contentTitle
 *         - shortIntro
 *         - contact
 *         - information
 *         - skills
 *         - aboutMe
 *       properties:
 *         contentTitle:
 *           type: string
 *         shortIntro:
 *           type: string
 *         contact:
 *           type: object
 *           required:
 *             - phone
 *             - email
 *             - birthDate
 *           properties:
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *             birthDate:
 *               type: string
 *         information:
 *           type: array
 *           items:
 *             type: object
 *         skills:
 *           type: array
 *           items:
 *             type: object
 *         aboutMe:
 *           type: array
 *           items:
 *             type: object
 *     ProjectContent:
 *       type: object
 *       required:
 *         - contentTitle
 *         - description
 *         - projects
 *       properties:
 *         contentTitle:
 *           type: string
 *         description:
 *           type: string
 *         projects:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - projectName
 *               - logoImage
 *               - projectDescription
 *               - date
 *               - stacks
 *               - projectImage
 *               - Participation
 *             properties:
 *               projectName:
 *                 type: string
 *               logoImage:
 *                 type: string
 *               projectDescription:
 *                 type: string
 *               date:
 *                 type: string
 *               stacks:
 *                 type: array
 *                 items:
 *                   type: string
 *               projectImage:
 *                 type: string
 *               Participation:
 *                 type: number
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
