"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Clock, TrendingUp, ArrowUp, ArrowDown, Star } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { useWatchlist, type Commodity } from "@/context/watchlist-context"
import { useRouter } from "next/navigation"

// Mock data for demonstration
const topSearches = [
  { id: 1, name: "Wheat", change: 12 },
  { id: 2, name: "Corn", change: 8 },
  { id: 3, name: "Rice", change: 5 },
  { id: 4, name: "Oats", change: 3 },
  { id: 5, name: "Barley", change: 2 },
]

const trendingNow = [
  { id: 1, name: "Corn", change: 15, trending: "up" },
  { id: 2, name: "Rice", change: 12, trending: "up" },
  { id: 3, name: "Wheat", change: 8, trending: "down" },
  { id: 4, name: "Sorghum", change: 6, trending: "up" },
  { id: 5, name: "Rye", change: 4, trending: "up" },
]

// Mock market data
const allMarkets = [
  { id: 1, name: "Wheat", quantity: "125K kg", price: 0.32, change: -2.02, unit: "kg" },
  { id: 2, name: "Corn", quantity: "250K kg", price: 0.24, change: 1.02, unit: "kg" },
  { id: 3, name: "Rice", quantity: "180K kg", price: 0.45, change: 0.75, unit: "kg" },
  { id: 4, name: "Oats", quantity: "90K kg", price: 0.28, change: -1.15, unit: "kg" },
  { id: 5, name: "Barley", quantity: "75K kg", price: 0.26, change: 0.88, unit: "kg" },
  { id: 6, name: "Sorghum", quantity: "60K kg", price: 0.22, change: -0.65, unit: "kg" },
  { id: 7, name: "Rye", quantity: "45K kg", price: 0.3, change: 1.25, unit: "kg" },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [filteredMarkets, setFilteredMarkets] = useState(allMarkets)
  const watchlistContext = useWatchlist()
  const [watchlistState, setWatchlistState] = useState<{
    watchlist: Commodity[]
    recentSearches: string[]
  }>({
    watchlist: [],
    recentSearches: [],
  })

  // Safely access watchlist context
  useEffect(() => {
    setMounted(true)

    try {
      if (watchlistContext) {
        setWatchlistState({
          watchlist: watchlistContext.watchlist || [],
          recentSearches: watchlistContext.recentSearches || [],
        })
      }
    } catch (error) {
      console.error("Error accessing watchlist context:", error)
    }

    return () => setMounted(false)
  }, [watchlistContext])

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen && mounted) {
      const timer = setTimeout(() => {
        const input = document.getElementById("search-modal-input")
        if (input) input.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, mounted])

  // Filter markets based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMarkets(allMarkets)
      return
    }

    const filtered = allMarkets.filter((market) => market.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredMarkets(filtered)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      try {
        if (watchlistContext && watchlistContext.addToRecentSearches) {
          watchlistContext.addToRecentSearches(searchQuery)
        }
      } catch (error) {
        console.error("Error adding to recent searches:", error)
      }
      // Here you would typically perform the actual search
      console.log("Searching for:", searchQuery)
    }
  }

  const handleToggleWatchlist = (e: React.MouseEvent, commodity: Commodity) => {
    e.stopPropagation()
    try {
      if (watchlistContext) {
        if (isInWatchlist(commodity.id)) {
          watchlistContext.removeFromWatchlist(commodity.id)
        } else {
          watchlistContext.addToWatchlist(commodity)
        }

        // Update local state
        setWatchlistState({
          watchlist: [...watchlistContext.watchlist],
          recentSearches: [...watchlistContext.recentSearches],
        })
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error)
    }
  }

  const handleNavigateToMarket = (name: string) => {
    onClose()
    router.push(`/market/${name.toLowerCase()}`)
  }

  const isInWatchlist = (id: number) => {
    return watchlistState.watchlist.some((item) => item.id === id)
  }

  const clearRecentSearches = () => {
    try {
      if (watchlistContext && watchlistContext.clearRecentSearches) {
        watchlistContext.clearRecentSearches()

        // Update local state
        setWatchlistState({
          ...watchlistState,
          recentSearches: [],
        })
      }
    } catch (error) {
      console.error("Error clearing recent searches:", error)
    }
  }

  // Sort markets to show watchlist items first
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    const aInWatchlist = isInWatchlist(a.id) ? 1 : 0
    const bInWatchlist = isInWatchlist(b.id) ? 1 : 0
    return bInWatchlist - aInWatchlist
  })

  if (!mounted) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} fullScreen title="Markets">
      <div className="p-4">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              id="search-modal-input"
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-4">
          {/* Top Searches */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="font-semibold">Top Searches</h3>
            </div>
            <div className="space-y-3">
              {topSearches.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => {
                    handleNavigateToMarket(item.name)
                    try {
                      if (watchlistContext && watchlistContext.addToRecentSearches) {
                        watchlistContext.addToRecentSearches(item.name)
                      }
                    } catch (error) {
                      console.error("Error adding to recent searches:", error)
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-xs">🌾</span>
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    {item.change >= 0 ? (
                      <ArrowUp className="h-4 w-4 text-[#15803D] mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={item.change >= 0 ? "text-[#15803D]" : "text-red-500"}>
                      {Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="font-semibold">Trending Now</h3>
            </div>
            <div className="space-y-3">
              {trendingNow.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => {
                    handleNavigateToMarket(item.name)
                    try {
                      if (watchlistContext && watchlistContext.addToRecentSearches) {
                        watchlistContext.addToRecentSearches(item.name)
                      }
                    } catch (error) {
                      console.error("Error adding to recent searches:", error)
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-green-100">
                      {item.trending === "up" ? (
                        <ArrowUp className="h-4 w-4 text-[#15803D]" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className={item.trending === "up" ? "text-[#15803D]" : "text-red-500"}>
                    {item.trending === "up" ? "+" : "-"}
                    {item.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Searches */}
        {watchlistState.recentSearches.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">Recent Searches</h3>
              <button onClick={clearRecentSearches} className="text-sm text-lime-600">
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {watchlistState.recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg p-2 hover:bg-gray-100"
                  onClick={() => {
                    setSearchQuery(search)
                    try {
                      if (watchlistContext && watchlistContext.addToRecentSearches) {
                        watchlistContext.addToRecentSearches(search)
                      }
                    } catch (error) {
                      console.error("Error adding to recent searches:", error)
                    }
                  }}
                >
                  <Clock className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Markets */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-bold">All Markets</h2>
          <div className="space-y-4">
            {sortedMarkets.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleNavigateToMarket(item.name)}
              >
                <div className="flex items-center">
                  <div className="mr-3 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    {item.change >= 0 ? (
                      <ArrowUp className="h-5 w-5 text-[#15803D]" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-green-600">{item.quantity.replace(" kg", "")}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-3">
                    <div className="font-medium">
                      ${item.price}/{item.unit}
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        item.change >= 0 ? "bg-[#15803D]" : "bg-red-500"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleToggleWatchlist(e, item)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        isInWatchlist(item.id) ? "fill-[#22C55E] text-[#22C55E]" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

