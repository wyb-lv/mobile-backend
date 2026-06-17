import {Router} from 'express'
import { walletController } from '../controllers/wallet.controller'
import { asyncHandler } from '../utils/AsyncHandler'
import { requireAuth } from '../middlewares/auth'

const router = Router()

/**
 * @openapi
 * /wallets:
 *   get:
 *     tags: [Wallet]
 *     summary: Get the current user's wallets with live balances
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets (from the wallet_balances view)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   wallet_id:
 *                     type: string
 *                     format: uuid
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [payment, tracking]
 *                   opening_balance:
 *                     type: integer
 *                     format: int64
 *                   balance:
 *                     type: integer
 *                     format: int64
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', requireAuth, asyncHandler(walletController.getWallets))

export default router