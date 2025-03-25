"use client"

import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Mock data for commodities
const commoditiesData = [
  {
    id: 1,
    name: "Rice",
    price: 2000.45,
    change: 1.2,
    sentiment: "bullish",
  },
  {
    id: 2,
    name: "Corn",
    price: 840.30,
    change: 2.1,
    sentiment: "bullish",
  },
  {
    id: 3,
    name: "Soybean",
    price: 2750.15,
    change: 0.8,
    sentiment: "bullish",
  },
  {
    id: 4,
    name: "Wheat",
    price: 1560.75,
    change: -2.02,
    sentiment: "bearish",
  },
  {
    id: 5,
    name: "Barley",
    price: 1120.90,
    change: -0.87,
    sentiment: "bearish",
  },
  {
    id: 6,
    name: "Quinoa",
    price: 6450.45,
    change: 2.55,
    sentiment: "bullish",
  },
  {
    id: 7,
    name: "Oats",
    price: 1650.25,
    change: 0.32,
    sentiment: "bullish",
  },
  {
    id: 8,
    name: "Millet",
    price: 2250.80,
    change: 1.88,
    sentiment: "bullish",
  },
]

export default function InsightsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleCommodityClick = (commodity: any) => {
    router.push(`/dashboard/insights/${commodity.name.toLowerCase()}`)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">AI Market Insights</h1>
          <div className="w-8 h-8 relative">
            <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={30} height={30} className="object-contain" />
          </div>
        </div>
      </header>

      {/* Commodities List */}
      <div className="px-4 py-5 space-y-3">
        {commoditiesData.map((commodity) => (
          <div
            key={commodity.id}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center"
            onClick={() => handleCommodityClick(commodity)}
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">{commodity.name}</h3>
              <p className="text-xl font-semibold text-gray-900">${commodity.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-base ${commodity.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {commodity.change >= 0 ? "+" : ""}
                {commodity.change}%
              </span>
              <div
                className={`flex items-center px-3 py-1 rounded-full ${
                  commodity.sentiment === "bullish" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                }`}
              >
                {commodity.sentiment === "bullish" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="text-sm">{commodity.sentiment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

