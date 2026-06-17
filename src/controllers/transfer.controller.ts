import type {AuthedRequest} from '../middlewares/auth'
import {transferService} from '../services/transfer.service'
import type { Response } from 'express'

export const transferController = {
    async transfer(req: AuthedRequest, res: Response) {
        const { from_wallet_id, transfer_date } = req.query
        res.json(await transferService.getTransfers(req.accessToken!, {
            from_wallet_id: typeof from_wallet_id === 'string' ? from_wallet_id : undefined,
            transfer_date: typeof transfer_date === 'string' ? transfer_date : undefined,
        }))
    }
}