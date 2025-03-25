import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient()

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If no code, redirect to the auth page
  return NextResponse.redirect(new URL("/auth", request.url))
}

