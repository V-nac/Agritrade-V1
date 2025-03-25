import type { ReactNode } from "react"
import BottomNavigation from "../dashboard/components/bottom-navigation"

export default function CommunityLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-16">{children}</main>
      <BottomNavigation />
    </div>
  )
} 