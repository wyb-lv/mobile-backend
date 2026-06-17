import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { asyncHandler } from '../utils/AsyncHandler'


const router = Router()

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: huytest@outlook.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *               name:
 *                 type: string
 *                 example: Bao Huy
 *     responses:
 *       201:
 *         description: User created (session returned if email confirmation is disabled)
 *       400:
 *         description: Signup failed
 */
router.post('/signup', asyncHandler(authController.signup))

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: huytest@outlook.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful, returns session with access_token
 *       400:
 *         description: Invalid credentials or email not confirmed
 */
router.post('/login', asyncHandler(authController.login))


export default router