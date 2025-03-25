import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for the browser
export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Singleton pattern for client-side Supabase instance
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export const getBrowserClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Server-side client (for server components and server actions)
export const createServerClient = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

