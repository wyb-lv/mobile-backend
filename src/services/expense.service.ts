import {supabaseForUser} from '../config/supabase'
import type { ExpenseDTO } from '../dto/DTO'

async function getExpenses(accessToken: string): Promise<ExpenseDTO[]> {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db.from('expenses').select('id, direction, amount, note, expense_date, profiles (name), wallets (name), categories (name), emotions (label), budgets (name)').order('expense_date', { ascending: false })
    if (error) throw new Error(error.message)
    const flatData: ExpenseDTO[] = data.map((item: any) => ({
        id: item.id,
        direction: item.direction,
        amount: item.amount,
        note: item.note,
        expense_date: item.expense_date,
        profile_name: item.profiles?.name || null,
        wallet_name: item.wallets?.name || null,
        category_name: item.categories?.name || null,
        emotion_label: item.emotions?.label || null,
        budget_name: item.budgets?.name || null
    }));    
    return flatData
}

export const expenseService = {
    getExpenses,
}