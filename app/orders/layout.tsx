import type React from "react"
import { NotificationProvider } from "@/context/notification-context"
import { WatchlistProvider } from "@/context/watchlist-context"

export default function OrdersLayout({
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

