"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import UserProfile from "./components/user-profile"
import MarketOverview from "./components/market-overview"
import PositionsOverview from "./components/positions-overview"
import RecentTransactions from "./components/recent-transactions"
import NewsSection from "./components/news-section"
import DashboardHeader from "./components/dashboard-header"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const supabase = getBrowserClient()

  useEffect(() => {
    setMounted(true)

    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/auth")
          return
        }

        setUser(session.user)

        // Fetch user profile
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profileData) {
          setProfile(profileData)
        }
      } catch (error) {
        console.error("Error checking user session:", error)
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      checkUser()
    }

    return () => {
      setMounted(false)
    }
  }, [router, supabase, mounted])

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-lime-500" />
      </div>
    )
  }

  return (
    <>
      <DashboardHeader />
      <UserProfile user={user} profile={profile} />
      <MarketOverview />
      <PositionsOverview />
      <RecentTransactions />
      <NewsSection />
    </>
  )
}

