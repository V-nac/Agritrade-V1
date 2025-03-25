import type React from "react"
import { WatchlistProvider } from "@/context/watchlist-context"
import { NotificationProvider } from "@/context/notification-context"

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <WatchlistProvider>
        <div className="flex flex-col min-h-screen bg-white">{children}</div>
      </WatchlistProvider>
    </NotificationProvider>
  )
}

