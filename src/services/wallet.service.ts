import {supabaseForUser} from '../config/supabase'

async function getWallets(accessToken: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db.from('wallet_balances').select('*')    
    if (error) throw new Error(error.message)
    return data
}

export const walletService = {
    getWallets,
}