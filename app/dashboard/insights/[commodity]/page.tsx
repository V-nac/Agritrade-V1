"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Share2 } from "lucide-react"
import { format } from "date-fns"

// Mock data generator for commodity details
const generateCommodityData = (commodity: string) => {
  // Generate a sentiment score between 60-90 for bullish commodities, 10-40 for bearish
  const isBullish = ["Rice", "Coffee", "Soybean"].includes(commodity)
  const sentimentScore = isBullish ? Math.floor(Math.random() * 31) + 60 : Math.floor(Math.random() * 31) + 10

  // News with appropriate sentiment
  const newsItems = [
    {
      title: "Federal Reserve Signals Potential Rate Cuts",
      source: "Financial Times",
      timeAgo: "2h ago",
      sentiment: "Positive",
    },
    {
      title: "Tech Sector Shows Strong Q4 Performance",
      source: "Bloomberg",
      timeAgo: "4h ago",
      sentiment: "Positive",
    },
    {
      title: "Global Supply Chain Concerns Persist",
      source: "Reuters",
      timeAgo: "6h ago",
      sentiment: "Negative",
    },
  ]

  // Weather impact
  const weatherImpact = {
    level: "Moderate Impact",
    description: "Clear conditions, stable market correlation",
  }

  // Social metrics
  const socialMetrics = {
    newsFlow: {
      status: "Strong",
      percentage: "+5%",
    },
    socialSentiment: {
      status: "Positive",
      percentage: "+8%",
    },
  }

  // Sentiment distribution
  const sentimentDistribution = {
    positive: sentimentScore,
    neutral: Math.floor((100 - sentimentScore) * 0.6),
    negative: Math.floor((100 - sentimentScore) * 0.4),
  }

  return {
    name: commodity,
    sentimentScore,
    isBullish,
    currentDate: format(new Date(), "EEEE, MMMM d, yyyy"),
    newsItems,
    weatherImpact,
    socialMetrics,
    sentimentDistribution,
  }
}

export default function CommodityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [commodityData, setCommodityData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (mounted && params.commodity) {
      // Capitalize first letter
      const commodityName = (params.commodity as string).charAt(0).toUpperCase() + (params.commodity as string).slice(1)

      // Simulate API fetch
      const timer = setTimeout(() => {
        setCommodityData(generateCommodityData(commodityName))
        setLoading(false)
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    }

    return () => {
      setMounted(false)
    }
  }, [params.commodity, mounted])

  if (!mounted || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="ml-4 h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>

        <div className="h-40 w-full bg-gray-200 rounded-lg animate-pulse mb-8"></div>

        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse mb-8"></div>

        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!commodityData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <p className="text-gray-500">Commodity not found</p>
        <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="p-1">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="ml-4 text-lg font-medium">AI Market Insights</h1>
          </div>
          <button className="p-1">
            <Share2 className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 pb-20">
        {/* Commodity Name and Buy/Sell Buttons */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-2xl font-bold">{commodityData.name}</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-green-600 text-white rounded-md font-medium">Buy</button>
              <button className="px-4 py-1.5 border border-green-600 text-green-600 rounded-md font-medium">
                Sell
              </button>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">Market Sentiment Overview</h3>
          <p className="text-sm text-gray-500">{commodityData.currentDate}</p>
        </div>

        {/* Sentiment Gauge */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 100 50" className="w-full">
              {/* Background arc */}
              <path d="M5,50 A45,45 0 0,1 95,50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              {/* Colored arc based on sentiment */}
              <path
                d={`M5,50 A45,45 0 0,1 ${5 + (90 * commodityData.sentimentScore) / 100},${50 - Math.sqrt(1 - Math.pow((commodityData.sentimentScore / 100 - 0.5) * 2, 2)) * 45}`}
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">{commodityData.sentimentScore}%</p>
            <p className="text-lg font-medium text-green-500">{commodityData.isBullish ? "Bullish" : "Bearish"}</p>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* Market Predictions */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Market Predictions</h3>
          <div className="bg-green-100 h-2 w-full rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${commodityData.sentimentScore}%` }}
            ></div>
          </div>

          {/* Time filter */}
          <div className="mt-4 flex justify-start">
            <div className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full">24h</div>
          </div>
        </div>

        {/* News Sentiment */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">News Sentiment</h3>
          <div className="space-y-4">
            {commodityData.newsItems.map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                <h4 className="font-medium mb-1">{item.title}</h4>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {item.source} • {item.timeAgo}
                  </div>
                  <div className={`text-sm ${item.sentiment === "Positive" ? "text-green-500" : "text-red-500"}`}>
                    {item.sentiment}
                  </div>
                </div>
                <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.sentiment === "Positive" ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: item.sentiment === "Positive" ? "80%" : "30%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Market Impact */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Weather Market Impact</h3>
          <div className="flex items-center mb-2">
            <div className="mr-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">{commodityData.weatherImpact.level}</p>
              <p className="text-sm text-gray-500">{commodityData.weatherImpact.description}</p>
            </div>
          </div>
          <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        {/* Social Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-800 mr-2"
              >
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" />
                <path d="M15 18h-5" />
                <path d="M10 6h8v4h-8V6Z" />
              </svg>
              <span className="text-sm text-gray-500">News Flow</span>
            </div>
            <p className="font-medium text-blue-800">Strong</p>
            <p className="text-sm text-green-500">{commodityData.socialMetrics.newsFlow.percentage}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-800 mr-2"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="text-sm text-gray-500">Social Sentiment</span>
            </div>
            <p className="font-medium text-blue-800">Positive</p>
            <p className="text-sm text-green-500">{commodityData.socialMetrics.socialSentiment.percentage}</p>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Sentiment Distribution</h3>
          <div className="flex">
            <div className="w-1/2">
              <div className="relative w-full aspect-square">
                <svg viewBox="0 0 100 100" className="w-full">
                  {/* Positive segment (green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="15"
                    strokeDasharray={`${(251.2 * commodityData.sentimentDistribution.positive) / 100} ${(251.2 * (100 - commodityData.sentimentDistribution.positive)) / 100}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Neutral segment (gray) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#6b7280"
                    strokeWidth="15"
                    strokeDasharray={`${(251.2 * commodityData.sentimentDistribution.neutral) / 100} ${(251.2 * (100 - commodityData.sentimentDistribution.neutral)) / 100}\`}tyData.sentimentDistribution.neutral) / 100}`}
                    strokeDashoffset={`${(-251.2 * commodityData.sentimentDistribution.positive) / 100}`}
                    transform="rotate(-90 50 50)"
                  />
                  {/* Negative segment (red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="15"
                    strokeDasharray={`${(251.2 * commodityData.sentimentDistribution.negative) / 100} ${(251.2 * (100 - commodityData.sentimentDistribution.negative)) / 100}`}
                    strokeDashoffset={`${(-251.2 * (commodityData.sentimentDistribution.positive + commodityData.sentimentDistribution.neutral)) / 100}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center">
              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">Positive</span>
                  </div>
                  <span className="font-medium text-green-500">{commodityData.sentimentDistribution.positive}%</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">Neutral</span>
                  </div>
                  <span className="font-medium text-gray-500">{commodityData.sentimentDistribution.neutral}%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">Negative</span>
                  </div>
                  <span className="font-medium text-red-500">{commodityData.sentimentDistribution.negative}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

