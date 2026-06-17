import { Router } from 'express'
import authRoutes from './auth.routes'
import walletRoutes from './wallet.routes'
import profileRoutes from './profile.routes'
import expenseRoutes from './expense.routes'
import transferRoutes from './transfer.routes'
import budgetRoutes from './budget.routes'
import analyticRoutes from './analytic.routes'
import spendingGroupRoutes from './spending-group.routes'
import categoryRoutes from './category.routes'

const router = Router()
router.use('/auth', authRoutes)
router.use('/wallets', walletRoutes)
router.use('/profile', profileRoutes)
router.use('/expenses', expenseRoutes)
router.use('/transfers', transferRoutes)
router.use('/budgets', budgetRoutes)
router.use('/analytics', analyticRoutes)
router.use('/spending-groups', spendingGroupRoutes)
router.use('/categories', categoryRoutes)
export default router
