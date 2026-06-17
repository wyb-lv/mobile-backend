import { supabaseForUser } from '../config/supabase'
import type { CreateCategoryInput, UpdateCategoryInput } from '../dto/DTO'

async function getCategories(accessToken: string, userId: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('categories')
        .select('id, user_id, name, icon')
        .eq('user_id', userId)
        .order('name', { ascending: true })
    if (error) throw new Error(error.message)
    return data
}

async function getCategoryById(accessToken: string, userId: string, id: string) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('categories')
        .select('id, user_id, name, icon')
        .eq('id', id)
        .eq('user_id', userId)
        .maybeSingle()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Category not found')
    return data
}

async function createCategory(accessToken: string, userId: string, input: CreateCategoryInput) {
    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('categories')
        .insert({
            user_id: userId,
            name: input.name,
            icon: input.icon ?? null,
        })
        .select('id, user_id, name, icon')
        .single()
    if (error) throw new Error(error.message)
    return data
}

async function updateCategory(accessToken: string, userId: string, id: string, input: UpdateCategoryInput) {
    const updates: Record<string, unknown> = {}
    if (input.name !== undefined) updates.name = input.name
    if (input.icon !== undefined) updates.icon = input.icon
    if (Object.keys(updates).length === 0) throw new Error('No fields to update')

    const db = supabaseForUser(accessToken)
    const { data, error } = await db
        .from('categories')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select('id, user_id, name, icon')
        .single()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Category not found')
    return data
}

async function deleteCategory(accessToken: string, userId: string, id: string) {
    const db = supabaseForUser(accessToken)
    const { error } = await db
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return { message: 'Category deleted' }
}

export const categoryService = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
