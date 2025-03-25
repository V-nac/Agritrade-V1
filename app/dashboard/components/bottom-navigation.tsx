"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, PlusCircle, Users, Wallet } from "lucide-react"
import BuySellModal from "./buy-sell-modal"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [isBuySellModalOpen, setIsBuySellModalOpen] = useState(false)

  // Check if the current path is the insights page or a sub-page
  const isInsightsActive = pathname === "/dashboard/insights" || pathname.startsWith("/dashboard/insights/")

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-16">
          <Link href="/dashboard" className="flex flex-col items-center justify-center w-full h-full">
            <Home className={`h-6 w-6 ${pathname === "/dashboard" ? "text-[#22C55E]" : "text-gray-500"}`} />
            <span className={`text-xs mt-1 ${pathname === "/dashboard" ? "text-[#22C55E]" : "text-gray-500"}`}>
              Home
            </span>
          </Link>

          <Link href="/dashboard/insights" className="flex flex-col items-center justify-center w-full h-full">
            <BarChart2 className={`h-6 w-6 ${isInsightsActive ? "text-[#22C55E]" : "text-gray-500"}`} />
            <span className={`text-xs mt-1 ${isInsightsActive ? "text-[#22C55E]" : "text-gray-500"}`}>AI Insights</span>
          </Link>

          <button
            onClick={() => setIsBuySellModalOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <div className="bg-[#22C55E] rounded-full p-3 -mt-8">
              <PlusCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-1">Buy/Sell</span>
          </button>

          <Link href="/dashboard/community" className="flex flex-col items-center justify-center w-full h-full">
            <Users className={`h-6 w-6 ${pathname === "/dashboard/community" ? "text-[#22C55E]" : "text-gray-500"}`} />
            <span
              className={`text-xs mt-1 ${pathname === "/dashboard/community" ? "text-[#22C55E]" : "text-gray-500"}`}
            >
              Community
            </span>
          </Link>

          <Link href="/dashboard/wallet" className="flex flex-col items-center justify-center w-full h-full">
            <Wallet className={`h-6 w-6 ${pathname === "/dashboard/wallet" ? "text-[#22C55E]" : "text-gray-500"}`} />
            <span className={`text-xs mt-1 ${pathname === "/dashboard/wallet" ? "text-[#22C55E]" : "text-gray-500"}`}>
              Wallet
            </span>
          </Link>
        </div>
      </div>

      {isBuySellModalOpen && <BuySellModal isOpen={isBuySellModalOpen} onClose={() => setIsBuySellModalOpen(false)} />}
    </>
  )
}

