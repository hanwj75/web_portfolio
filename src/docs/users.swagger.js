/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - userName
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the user
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: Hashed password
 *         userName:
 *           type: string
 *           description: User's display name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 *           description: Last login timestamp
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         email: "user@example.com"
 *         userName: "JohnDoe"
 *         createdAt: "2023-01-01T00:00:00Z"
 *         updatedAt: "2023-01-02T00:00:00Z"
 *         lastLoginAt: "2023-01-02T12:00:00Z"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관리 API
 */

/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     tags: [Users]
 *     summary: 회원가입
 *     description: 이메일과 비밀번호로 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - passwordCheck
 *               - userName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "password123!"
 *               passwordCheck:
 *                 type: string
 *                 format: password
 *                 example: "password123!"
 *               userName:
 *                 type: string
 *                 example: "JohnDoe"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입이 완료되었습니다."
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 userName:
 *                   type: string
 *                   example: "John Doe"
 *       409:
 *         description: |
 *           충돌 발생:
 *           - 이미 존재하는 이메일 (409)
 *           - 비밀번호 불일치 (409)
 *       500:
 *         description: 서버 내부 오류
 */

/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     tags: [Users]
 *     summary: 로그인
 *     description: 이메일과 비밀번호로 로그인하여 JWT 토큰을 발급받습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123!"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: JWT 토큰 (Bearer 형식)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 userName:
 *                   type: string
 *                   example: "JohnDoe"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: 인증 실패 (이메일 없음 또는 비밀번호 불일치)
 *       500:
 *         description: 서버 내부 오류
 */

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: 회원정보 수정
 *     description: 현재 사용자의 정보(비밀번호 또는 이름)를 수정합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: "oldPassword123!"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newPassword456!"
 *               newName:
 *                 type: string
 *                 example: "UpdatedName"
 *     responses:
 *       200:
 *         description: 회원정보 수정 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원정보 수정 완료"
 *                 userName:
 *                   type: string
 *                   example: "UpdatedName"
 *       400:
 *         description: 현재 비밀번호 필드 누락
 *       401:
 *         description: 비밀번호 불일치
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 내부 오류
 *
 *   delete:
 *     tags: [Users]
 *     summary: 회원탈퇴
 *     description: 현재 사용자 계정을 영구 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123!"
 *     responses:
 *       200:
 *         description: 회원탈퇴 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원탈퇴 완료"
 *       401:
 *         description: 비밀번호 불일치
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 내부 오류
 */
