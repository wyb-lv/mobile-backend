import {Router} from 'express'
import { walletController } from '../controllers/wallet.controller'
import { asyncHandler } from '../utils/AsyncHandler'

const router = Router()
router.get('/', asyncHandler(walletController.getWallets))
export default router