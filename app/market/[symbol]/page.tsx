"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react"
import MarketChart from "./components/market-chart"
import MarketStats from "./components/market-stats"
import TimeframeSelector from "./components/timeframe-selector"
import PriceRange from "./components/price-range"
import OpenOrders from "./components/open-orders"
import MarketNews from "./components/market-news"
import BuySellButtons from "./components/buy-sell-buttons"
import { useWatchlist } from "@/context/watchlist-context"
import { generateMarketData } from "@/lib/market-data"

export default function MarketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  const watchlistContext = useWatchlist()

  const [marketData, setMarketData] = useState<any>(null)
  const [timeframe, setTimeframe] = useState<"1H" | "4H" | "1D" | "1W" | "1M" | "1Y">("1D")
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simulate API fetch with a delay
    if (mounted) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const data = generateMarketData(symbol, timeframe)
        setMarketData(data)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }

    return () => setMounted(false)
  }, [symbol, timeframe, mounted])

  const handleToggleWatchlist = () => {
    if (!marketData || !watchlistContext) return

    if (watchlistContext.isInWatchlist(marketData.id)) {
      watchlistContext.removeFromWatchlist(marketData.id)
    } else {
      watchlistContext.addToWatchlist({
        id: marketData.id,
        name: marketData.name,
        price: marketData.currentPrice,
        change: marketData.priceChangePercent,
        unit: marketData.unit,
        quantity: marketData.volume,
      })
    }
  }

  const isInWatchlist = (id: number) => {
    return watchlistContext?.isInWatchlist(id) || false
  }

  const handleGoBack = () => {
    router.back()
  }

  if (!mounted || isLoading || !marketData) {
    return (
      <div className="flex flex-col min-h-screen bg-white p-4">
        <div className="flex items-center justify-between">
          <button onClick={handleGoBack} className="p-2">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{symbol?.toUpperCase()}</h1>
          <div className="w-10"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col w-full space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-60 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-40 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={handleGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-[#15803D]" />
          </button>
          <h1 className="text-xl font-bold text-[#15803D]">{marketData.name.toUpperCase()}</h1>
          <button
            onClick={handleToggleWatchlist}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isInWatchlist(marketData.id) ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Star
              className={`h-6 w-6 ${isInWatchlist(marketData.id) ? "fill-[#22C55E] text-[#22C55E]" : "text-gray-400"}`}
            />
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-6 max-w-3xl mx-auto w-full">
        {/* Price and change */}
        <div className="mb-8">
          <div className="flex items-baseline">
            <h2 className="text-4xl font-bold text-gray-900">${marketData.currentPrice.toFixed(2)}</h2>
            <span className="text-gray-500 ml-2 text-lg">/{marketData.unit}</span>
          </div>
          <div className="flex items-center mt-3">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-md ${
                marketData.priceChangePercent >= 0 ? "bg-[#22C55E]/10 text-[#15803D]" : "bg-red-500/10 text-red-500"
              }`}
            >
              <span
                className={`inline-flex justify-center items-center w-6 h-6 mr-2 rounded ${
                  marketData.priceChangePercent >= 0 ? "bg-[#15803D] text-white" : "bg-red-500 text-white"
                }`}
              >
                {marketData.priceChangePercent >= 0 ? "+" : "-"}
              </span>
              {Math.abs(marketData.priceChangePercent).toFixed(2)}%
            </span>
            <span className="text-gray-500 ml-3">Today</span>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <MarketChart data={marketData.chartData} priceChange={marketData.priceChangePercent} />
        </div>

        {/* Timeframe selector */}
        <div className="mb-8">
          <TimeframeSelector activeTimeframe={timeframe} onTimeframeChange={setTimeframe} />
        </div>

        {/* Price range */}
        <div className="mb-8">
          <PriceRange low={marketData.dayLow} high={marketData.dayHigh} current={marketData.currentPrice} />
        </div>

        {/* Market stats */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Market Statistics</h3>
          <MarketStats
            bid={marketData.bid}
            ask={marketData.ask}
            dayHigh={marketData.dayHigh}
            dayLow={marketData.dayLow}
            volume={marketData.volume}
            prevClose={marketData.prevClose}
            unit={marketData.unit}
          />
        </div>

        {/* Open orders */}
        <div className="mb-8">
          <OpenOrders orders={marketData.openOrders} symbol={marketData.name} />
        </div>

        {/* Market news */}
        <div className="mb-8">
          <MarketNews news={marketData.news} symbol={marketData.name} />
        </div>
      </main>

      {/* Buy/Sell buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <BuySellButtons commodity={marketData} />
        </div>
      </div>
    </div>
  )
}

