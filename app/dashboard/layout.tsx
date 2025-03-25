import type React from "react"
import BottomNavigation from "./components/bottom-navigation"
import { WatchlistProvider } from "@/context/watchlist-context"
import { NotificationProvider } from "@/context/notification-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <WatchlistProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <main className="flex-1 pb-16">{children}</main>
          <BottomNavigation />
        </div>
      </WatchlistProvider>
    </NotificationProvider>
  )
}

