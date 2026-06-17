import type { Response } from 'express'
import type { AuthedRequest } from '../middlewares/auth'
import { expenseService } from '../services/expense.service'

export const expenseController = {
    async getExpenses(req: AuthedRequest, res: Response) {
        res.json(await expenseService.getExpenses(req.accessToken!))
    }
}