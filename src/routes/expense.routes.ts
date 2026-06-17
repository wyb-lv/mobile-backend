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

/**
 * @openapi
 * /expenses:
 *   post:
 *     tags: [Expense]
 *     summary: Create an income/expense entry
 *     description: Adds a transaction; wallet balances update automatically through the wallet_balances view.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wallet_id:
 *                 type: string
 *                 format: uuid
 *               direction:
 *                 type: string
 *                 enum: [in, out]
 *               amount:
 *                 type: number
 *               expense_date:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *                 nullable: true
 *               category_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               emotion_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               budget_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *             required:
 *               - wallet_id
 *               - direction
 *               - amount
 *               - expense_date
 *     responses:
 *       201:
 *         description: Created expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Missing or invalid token
 */
router.post('/', requireAuth, asyncHandler(expenseController.createExpense))

export default router