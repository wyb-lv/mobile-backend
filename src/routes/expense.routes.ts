import {Router} from 'express'
import {asyncHandler} from '../utils/AsyncHandler'
import {expenseController} from '../controllers/expense.controller'

const router = Router()

/**
 * @openapi
 * /expense:
 *   get:
 *     tags: [Expense]
 *     summary: Get expenses for a wallet
 *     parameters:
 *       - in: query
 *         name: wallet_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet id to filter expenses
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   direction:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   note:
 *                     type: string
 *                     nullable: true
 *                   expense_date:
 *                     type: string
 *                     format: date-time
 *                   profile_name:
 *                     type: string
 *                     nullable: true
 *                   wallet_name:
 *                     type: string
 *                     nullable: true
 *                   category_name:
 *                     type: string
 *                     nullable: true
 *                   emotion_label:
 *                     type: string
 *                     nullable: true
 *                   budget_name:
 *                     type: string
 *                     nullable: true
 *       400:
 *         description: Missing or invalid wallet_id
 */
router.get('/', asyncHandler(expenseController.getExpenses))

export default router