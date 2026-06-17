import { supabaseForUser } from '../config/supabase'
import type { CreateWalletInput, UpdateWalletInput } from '../dto/DTO'

async function getWallets(accessToken: string, userId: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db.from('wallet_balances').select('*').eq('user_id', userId)
    if (error) throw new Error(error.message)
    return data
}

async function getWalletSummary(accessToken: string, userId: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db.from('wallet_balances').select('type, balance').eq('user_id', userId)
    if (error) throw new Error(error.message)

    const summary = (data ?? []).reduce(
        (acc, row) => {
            const balance = row.balance ?? 0
            acc.total += balance
            if (row.type === 'payment') acc.payment += balance
            else if (row.type === 'tracking') acc.tracking += balance
            return acc
        },
        { total: 0, payment: 0, tracking: 0 }
    )
    return summary
}

async function getWalletById(accessToken: string, userId: string, id: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('wallet_balances')
        .select('*')
        .eq('wallet_id', id)
        .eq('user_id', userId)
        .maybeSingle()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Wallet not found')
    return data
}

async function createWallet(accessToken: string, userId: string, input: CreateWalletInput) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('wallets')
        .insert({
            user_id: userId,
            name: input.name,
            type: input.type,
            opening_balance: input.opening_balance ?? 0,
        })
        .select('id, user_id, name, type, opening_balance')
        .single()
    if (error) throw new Error(error.message)
    return data
}

async function updateWallet(accessToken: string, userId: string, id: string, input: UpdateWalletInput) {
    const updates: Record<string, unknown> = {}
    if (input.name !== undefined) updates.name = input.name
    if (input.type !== undefined) updates.type = input.type
    if (input.opening_balance !== undefined) updates.opening_balance = input.opening_balance
    if (Object.keys(updates).length === 0) throw new Error('No fields to update')

    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('wallets')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select('id, user_id, name, type, opening_balance')
        .single()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Wallet not found')
    return data
}

async function deleteWallet(accessToken: string, userId: string, id: string) {
    const db = supabaseForUser(accessToken)
    const { error } = await db
        .from('wallets')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return { message: 'Wallet deleted' }
}

export const walletService = {
    getWallets,
    getWalletSummary,
    getWalletById,
    createWallet,
    updateWallet,
    deleteWallet,
}