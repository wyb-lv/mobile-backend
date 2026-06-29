import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'

config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) })

const url = process.env.SUPABASE_URL!
const anon = process.env.SUPABASE_ANON_KEY!
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAuth = createClient(url, anon, {
  auth: { persistSession: false }
})

export const supabaseAdmin = serviceRole
  ? createClient(url, serviceRole, { auth: { persistSession: false } })
  : null

export const supabaseForUser = (accessToken: string) =>
  createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false }
  })

export const supabaseFresh = () =>
  createClient(url, anon, { auth: { persistSession: false } })