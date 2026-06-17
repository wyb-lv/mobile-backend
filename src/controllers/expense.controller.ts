import type { Response } from 'express'
import type { AuthedRequest } from '../middlewares/auth'
import { expenseService } from '../services/expense.service'

export const expenseController = {
    async getExpenses(req: AuthedRequest, res: Response) {
        res.json(await expenseService.getExpenses(req.accessToken!, req.userId!))
    },
    async createExpense(req: AuthedRequest, res: Response) {
        const { wallet_id, direction, amount, expense_date, note, category_id, emotion_id, budget_id } = req.body
        if (!wallet_id || !direction || amount == null || !expense_date) {
            return res.status(400).json({ message: 'wallet_id, direction, amount and expense_date are required' })
        }
        const data = await expenseService.createExpense(req.accessToken!, req.userId!, {
            wallet_id, direction, amount, expense_date, note, category_id, emotion_id, budget_id,
        })
        res.status(201).json({ message: 'Expense created', data })
    }
}