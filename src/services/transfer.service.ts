import {supabaseForUser} from '../config/supabase'

interface FilterOptions {
    transfer_date?: string | undefined;
    from_wallet_id?: string | undefined;
}

async function getTransfers(accessToken: string, options?: FilterOptions) {
    const db = supabaseForUser(accessToken)
    let query = db
        .from('wallet_transfers')
        .select('*')
    if (options?.transfer_date) {
        query = query.eq('transfer_date', options.transfer_date);
    }
    if (options?.from_wallet_id) {
        query = query.eq('from_wallet_id', options.from_wallet_id);
    }
    const { data, error } = await query.order('transfer_date', { ascending: false })
    if (error) throw new Error(error.message)
    return data
}

export const transferService = {
    getTransfers
}