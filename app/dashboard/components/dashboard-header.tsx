"use client"

import { Bell, Settings, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getBrowserClient } from "@/lib/supabase"
import SearchModal from "./search-modal"
import Image from "next/image"
import HamburgerMenu from "@/components/hamburger-menu"
import { useNotifications } from "@/context/notification-context"

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = getBrowserClient()

  // Safely access notification context
  const notificationContext = useNotifications()

  useEffect(() => {
    setMounted(true)

    // Update unread count when notification context changes
    if (notificationContext) {
      setUnreadCount(notificationContext.unreadCount || 0)
    }

    return () => setMounted(false)
  }, [notificationContext])

  // Check if we're on the insights page
  const isInsightsPage = pathname === "/dashboard/insights"

  // Check if we're on a specific commodity insights page
  const isInsightsCommodityPage = pathname.startsWith("/dashboard/insights/") && pathname !== "/dashboard/insights"

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth")
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          {!isInsightsPage && !isInsightsCommodityPage && (
            <div className="flex items-center">
              <HamburgerMenu />
              <div className="flex items-center gap-2 ml-3">
                <Image
                  src="/agritrade-logo.png"
                  alt="Agritrade Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <h1 className="text-lg font-semibold">Home</h1>
              </div>
            </div>
          )}

          {isInsightsPage && (
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-semibold">AI Market Insights</h1>
              <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={30} height={30} className="object-contain" />
            </div>
          )}

          {isInsightsCommodityPage && (
            <div className="flex items-center">
              <button onClick={() => router.back()} className="p-1">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
              <h1 className="ml-4 text-lg font-medium">AI Market Insights</h1>
            </div>
          )}

          {!isInsightsPage && (
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push("/inbox")} className="relative">
                <Bell className="h-6 w-6 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <button onClick={() => router.push("/settings")}>
                <Settings className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {!isInsightsPage && !isInsightsCommodityPage && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full text-gray-700 focus:outline-none"
                onClick={() => setIsSearchModalOpen(true)}
                readOnly
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </header>

      {isSearchModalOpen && <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />}
    </>
  )
}

