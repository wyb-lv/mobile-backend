import {supabaseForUser} from '../config/supabase'
import type { ExpenseDTO, CreateExpenseInput } from '../dto/DTO'

async function getExpenses(accessToken: string, userId: string): Promise<ExpenseDTO[]> {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('expenses')
        .select('id, direction, amount, note, expense_date, wallets (name), categories (name), emotions (label), budgets (name)')
        .eq('user_id', userId)
        .order('expense_date', { ascending: false })
    if (error) throw new Error(error.message)
    // All expenses belong to the authenticated user, so profile_name is the same for every row.
    const { data: profile } = await db.from('profiles').select('name').eq('id', userId).single()
    const profileName: string | null = profile?.name ?? null
    const flatData: ExpenseDTO[] = data.map((item: any) => ({
        id: item.id,
        direction: item.direction,
        amount: item.amount,
        note: item.note,
        expense_date: item.expense_date,
        profile_name: profileName,
        wallet_name: item.wallets?.name || null,
        category_name: item.categories?.name || null,
        emotion_label: item.emotions?.label || null,
        budget_name: item.budgets?.name || null
    }));
    return flatData
}

async function createExpense(accessToken: string, userId: string, input: CreateExpenseInput) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('expenses')
        .insert({
            user_id: userId,
            wallet_id: input.wallet_id,
            direction: input.direction,
            amount: input.amount,
            expense_date: input.expense_date,
            note: input.note ?? null,
            category_id: input.category_id ?? null,
            emotion_id: input.emotion_id ?? null,
            budget_id: input.budget_id ?? null,
        })
        .select('id, direction, amount, note, expense_date, wallet_id, category_id, emotion_id, budget_id')
        .single()
    if (error) throw new Error(error.message)
    return data
}

export const expenseService = {
    getExpenses,
    createExpense,
}