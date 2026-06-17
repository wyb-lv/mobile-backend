import { Router } from 'express'
import authRoutes from './auth.routes'
import walletRoutes from './wallet.routes'
import profileRoutes from './profile.routes'
import expenseRoutes from './expense.routes'

const router = Router()
router.use('/auth', authRoutes)
router.use('/wallets', walletRoutes)
router.use('/profile', profileRoutes)
router.use('/expenses', expenseRoutes)
export default router
