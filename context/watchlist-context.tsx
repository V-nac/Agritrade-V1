"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the commodity type
export interface Commodity {
  id: number
  name: string
  price: number
  change: number
  unit: string
  quantity: string
}

interface WatchlistContextType {
  watchlist: Commodity[]
  addToWatchlist: (commodity: Commodity) => void
  removeFromWatchlist: (commodityId: number) => void
  isInWatchlist: (commodityId: number) => boolean
  recentSearches: string[]
  addToRecentSearches: (search: string) => void
  clearRecentSearches: () => void
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Commodity[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("agritrade-watchlist")
    const savedSearches = localStorage.getItem("agritrade-recent-searches")

    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist))
      } catch (e) {
        console.error("Failed to parse watchlist from localStorage", e)
      }
    }

    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (e) {
        console.error("Failed to parse recent searches from localStorage", e)
      }
    }
  }, [])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("agritrade-watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("agritrade-recent-searches", JSON.stringify(recentSearches))
  }, [recentSearches])

  const addToWatchlist = (commodity: Commodity) => {
    setWatchlist((prev) => {
      // Check if already in watchlist
      if (prev.some((item) => item.id === commodity.id)) {
        return prev
      }
      return [...prev, commodity]
    })
  }

  const removeFromWatchlist = (commodityId: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== commodityId))
  }

  const isInWatchlist = (commodityId: number) => {
    return watchlist.some((item) => item.id === commodityId)
  }

  const addToRecentSearches = (search: string) => {
    if (!search.trim()) return

    setRecentSearches((prev) => {
      // Remove if already exists (to prevent duplicates)
      const filtered = prev.filter((item) => item.toLowerCase() !== search.toLowerCase())
      // Add to beginning and limit to 5 items
      return [search, ...filtered].slice(0, 5)
    })
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        recentSearches,
        addToRecentSearches,
        clearRecentSearches,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

