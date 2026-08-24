import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://grogjaqxxzultvsjbwnp.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Y0asSMFKvP60oryA96J7AA_uA8_XdTw'

export function supabaseBrowser() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY)
}
