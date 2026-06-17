import {Router} from 'express'
import {asyncHandler} from '../utils/AsyncHandler'
import {expenseController} from '../controllers/expense.controller'
import {requireAuth} from '../middlewares/auth'

const router = Router()

/**
 * @openapi
 * /expenses:
 *   get:
 *     tags: [Expense]
 *     summary: Get all expenses for the authenticated user
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', requireAuth, asyncHandler(expenseController.getExpenses))

export default router