import type { Request, Response } from 'express'
import {walletService} from '../services/wallet.service'

export const walletController = {
    async getWallets(req: Request, res: Response) {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (!accessToken) return res.status(401).json({ error: 'Unauthorized' })
        res.json(await walletService.getWallets(accessToken))
    }   
}