export interface UserDTO {
    id: string
    email: string
    full_name: string
    avatar_url: string | null
}

export interface ExpenseDTO {
    id: string
    direction: string
    amount: number
    note: string
    expense_date: string
    profile_name: string | null
    wallet_name: string | null
    category_name: string | null
    emotion_label: string | null
    budget_name: string | null
}