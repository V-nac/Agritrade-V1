"use client"

import { BottomSheet } from "@/components/ui/modal"
import { Star, ChevronDown, ChevronUp, Clock, BarChart2 } from "lucide-react"
import { useState } from "react"
import { useWatchlist } from "@/context/watchlist-context"

interface MarketDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  market?: {
    id: number
    name: string
    price: number
    change: number
    unit: string
    quantity: string
    description?: string
  }
}

export default function MarketDetailsModal({
  isOpen,
  onClose,
  market = {
    id: 1,
    name: "Wheat",
    price: 0.32,
    change: -2.02,
    unit: "kg",
    quantity: "125K kg",
    description: "Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.",
  },
}: MarketDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  if (!market) return null

  const handleToggleWatchlist = () => {
    if (isInWatchlist(market.id)) {
      removeFromWatchlist(market.id)
    } else {
      addToWatchlist(market)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={market.name.toUpperCase()}>
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">
              ${market.price}/{market.unit}
            </div>
            <div className={`flex items-center ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {market.change >= 0 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span>
                {market.change >= 0 ? "+" : ""}
                {market.change}%
              </span>
              <span className="ml-2 text-gray-500">Today</span>
            </div>
          </div>
          <button onClick={handleToggleWatchlist} className="rounded-full p-2 hover:bg-gray-100">
            <Star
              className={`h-6 w-6 ${isInWatchlist(market.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
            />
          </button>
        </div>

        <div className="mb-6 flex rounded-lg bg-gray-100">
          <button
            className={`flex-1 rounded-lg py-2 text-center ${
              activeTab === "overview" ? "bg-white text-lime-600 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 rounded-lg py-2 text-center ${
              activeTab === "chart" ? "bg-white text-lime-600 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("chart")}
          >
            Chart
          </button>
          <button
            className={`flex-1 rounded-lg py-2 text-center ${
              activeTab === "history" ? "bg-white text-lime-600 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">About {market.name}</h3>
              <p className="text-gray-700">{market.description}</p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Available Supply</div>
                <div className="text-lg font-semibold">{market.quantity}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Market Cap</div>
                <div className="text-lg font-semibold">$4.2M</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-sm text-gray-500">24h Volume</div>
                <div className="text-lg font-semibold">$320K</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-sm text-gray-500">All-time High</div>
                <div className="text-lg font-semibold">$0.45/kg</div>
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">Price Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">24h Low / 24h High</span>
                  <span>$0.30 / $0.34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">7d Low / 7d High</span>
                  <span>$0.28 / $0.36</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Market Rank</span>
                  <span>#3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "chart" && (
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <div className="text-center">
              <BarChart2 className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-gray-500">Price chart coming soon</p>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            <h3 className="font-semibold">Recent Price History</h3>
            {[
              { date: "Today", price: 0.32, change: -2.02 },
              { date: "Yesterday", price: 0.33, change: 1.54 },
              { date: "Apr 22, 2023", price: 0.32, change: -0.62 },
              { date: "Apr 21, 2023", price: 0.33, change: 2.17 },
              { date: "Apr 20, 2023", price: 0.32, change: -1.23 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <span>{item.date}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.price}/kg</div>
                  <div className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="rounded-lg bg-lime-500 py-3 font-medium text-white">Buy</button>
          <button className="rounded-lg border border-lime-500 py-3 font-medium text-lime-500">Sell</button>
        </div>
      </div>
    </BottomSheet>
  )
}

