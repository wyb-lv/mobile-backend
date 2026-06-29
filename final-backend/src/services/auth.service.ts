import { supabaseAuth, supabaseFresh, supabaseAdmin, supabaseForUser } from '../config/supabase'

export const authService = {
  async signup(email: string, password: string, name: string) {
    const { data, error } = await supabaseAuth.auth.signUp({
      email, password, options: { data: { full_name: name } },
    })
    if (error) throw new Error(error.message)
    return data
  },
  async login(email: string, password: string) {
    const { data, error } = (await supabaseAuth.auth.signInWithPassword({ email, password }))
    if (error) throw new Error(error.message)
    return data.session
  },
  async refresh(refreshToken: string) {
    const client = supabaseFresh()
    const { data, error } = await client.auth.refreshSession({ refresh_token: refreshToken })
    if (error) throw new Error(error.message)
    if (!data.session) throw new Error('Invalid refresh token')
    return data.session
  },
  async logout(accessToken: string) {
    // Revoke the session server-side so the refresh token can no longer be
    // used. The access token itself stays valid until it expires (stateless
    // JWT), which is the standard Supabase logout behaviour.
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.auth.admin.signOut(accessToken, 'global')
      if (error) throw new Error(error.message)
    } else {
      const { error } = await supabaseForUser(accessToken).auth.signOut()
      if (error) throw new Error(error.message)
    }
    return { message: 'Logged out' }
  },
  async changePassword(accessToken: string, oldPassword: string, newPassword: string) {
    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(accessToken)
    const email = userData.user?.email
    if (userError || !email) throw new Error('Unable to load current user')
    const client = supabaseFresh()
    const { error: signInError } = await client.auth.signInWithPassword({ email, password: oldPassword })
    if (signInError) throw new Error('Old password is incorrect')
    const { error: updateError } = await client.auth.updateUser({ password: newPassword })
    if (updateError) throw new Error(updateError.message)
    return { message: 'Password updated' }
  },
}