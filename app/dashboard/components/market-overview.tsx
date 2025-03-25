"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useWatchlist } from "@/context/watchlist-context"

// Mock data for demonstration
const marketData = [
  { id: 1, name: "Rice", price: 2.0, change: 1.02, unit: "kg", quantity: "200K kg" },
  { id: 2, name: "Wheat", price: 1.56, change: -2.02, unit: "kg", quantity: "125K kg" },
  { id: 3, name: "Potato", price: 1.33, change: -1.42, unit: "kg", quantity: "180K kg" },
]

const quickAccessItems = [
  { id: 1, name: "Potato", change: 2.5 },
  { id: 2, name: "Wheat", change: 1.25 },
  { id: 3, name: "Rice", change: -3.13 },
  { id: 4, name: "Mango", change: -1.06 },
]

export default function MarketOverview() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("mostViewed")
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<any>(null)
  const [showAllMarkets, setShowAllMarkets] = useState(false)
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  const handleMarketClick = (market: any) => {
    // Navigate to market detail page instead of showing modal
    router.push(`/market/${market.name.toLowerCase()}`)
  }

  const handleToggleWatchlist = (e: React.MouseEvent, market: any) => {
    e.stopPropagation()
    if (isInWatchlist(market.id)) {
      removeFromWatchlist(market.id)
    } else {
      addToWatchlist(market)
    }
  }

  // Determine which data to show based on active tab
  const getDisplayData = () => {
    if (activeTab === "favorites") {
      return watchlist
    }
    return marketData
  }

  const displayData = getDisplayData()
  const visibleMarkets = showAllMarkets ? displayData : displayData.slice(0, 2)

  return (
    <div className="mt-4 px-4">
      <div className="bg-white rounded-lg p-3 shadow-sm">
        {/* Tabs */}
        <div className="flex rounded-lg bg-gray-100 mb-4">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium rounded-lg ${
              activeTab === "mostViewed" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("mostViewed")}
          >
            Most Viewed
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium rounded-lg ${
              activeTab === "favorites" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium rounded-lg ${
              activeTab === "popular" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            Popular
          </button>
        </div>

        {/* Market items */}
        <div>
          <div className="grid grid-cols-3 text-xs text-gray-500 mb-2 px-2">
            <div>Name</div>
            <div className="text-right">Last Price</div>
            <div className="text-right">24h % Change</div>
          </div>

          {visibleMarkets.length > 0 ? (
            visibleMarkets.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 items-center py-3 border-b border-gray-100 cursor-pointer"
                onClick={() => handleMarketClick(item)}
              >
                <div className="flex items-center">
                  <button className="mr-2" onClick={(e) => handleToggleWatchlist(e, item)}>
                    <Star
                      className={`h-5 w-5 ${
                        isInWatchlist(item.id) ? "fill-[#22C55E] text-[#22C55E]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <span className="font-medium">{item.name.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  ${item.price}/{item.unit}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md ${
                      item.change >= 0 ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    <span
                      className={`inline-flex justify-center items-center w-5 h-5 mr-1 rounded ${
                        item.change >= 0 ? "bg-[#22C55E] text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {item.change >= 0 ? "+" : "-"}
                    </span>
                    {Math.abs(item.change).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              {activeTab === "favorites" ? (
                <div>
                  <Star className="mx-auto h-8 w-8 mb-2 text-gray-300" />
                  <p>No favorites yet</p>
                  <p className="text-sm mt-1">Add items to your watchlist to see them here</p>
                </div>
              ) : (
                <p>No items to display</p>
              )}
            </div>
          )}

          {displayData.length > 2 && (
            <div className="text-center mt-3">
              <button className="text-sm text-[#22C55E]" onClick={() => setShowAllMarkets(!showAllMarkets)}>
                {showAllMarkets ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>

        {/* Quick access buttons */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {quickAccessItems.map((item) => (
            <button
              key={item.id}
              className="flex-shrink-0 flex items-center gap-1 bg-white border border-gray-200 px-3 py-2 rounded-lg"
              onClick={() =>
                handleMarketClick({
                  id: item.id,
                  name: item.name,
                  price: 0.32,
                  change: item.change,
                  unit: "kg",
                  quantity: "100K kg",
                })
              }
            >
              <div className="w-6 h-6 bg-[#22C55E]/10 rounded-md flex items-center justify-center">
                <span className="text-xs">🌾</span>
              </div>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="flex items-center">
                <span
                  className={`inline-flex justify-center items-center w-4 h-4 rounded ${
                    item.change >= 0 ? "bg-[#22C55E] text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {item.change >= 0 ? "+" : "-"}
                </span>
                <span className={`text-xs ml-1 ${item.change >= 0 ? "text-[#22C55E]" : "text-red-500"}`}>
                  {Math.abs(item.change).toFixed(1)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

