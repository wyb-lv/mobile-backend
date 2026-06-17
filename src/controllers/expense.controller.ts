import type { Request, Response } from 'express'
import { expenseService } from '../services/expense.service'

export const expenseController = {
    async getExpenses(req: Request, res: Response) {
        const { wallet_id } = req.query
        if (typeof wallet_id !== 'string') {
            res.status(400).json({ error: 'wallet_id is required' })
            return
        }
        res.json(await expenseService.getExpenses(wallet_id))
    }
}