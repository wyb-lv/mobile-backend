import {Router} from 'express'
import {asyncHandler} from '../utils/AsyncHandler'
import {requireAuth} from '../middlewares/auth'
import { transferController } from '../controllers/transfer.controller'

const router = Router()
/**
 * @openapi
 * /transfers:
 *   get:
 *     tags: [Transfer]
 *     summary: Get wallet transfers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from_wallet_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional source wallet id to filter transfers
 *       - in: query
 *         name: transfer_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Optional transfer date (YYYY-MM-DD) to filter transfers
 *     responses:
 *       200:
 *         description: A list of wallet transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Missing or invalid token
 */router.get('/', requireAuth, asyncHandler(transferController.transfer))

export default router  