"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Bookmark } from "lucide-react"

// Mock data for demonstration
const newsData = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "2h ago",
    content: "Rice prices showing strong support at current levels. Looking bullish for next week.",
    likes: 2400,
    comments: 89,
  },
  {
    id: 2,
    author: "Michael Ross",
    avatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "2h ago",
    content: "Technical analysis suggests a breakout coming soon. Watch these levels carefully.",
    likes: 1800,
    comments: 56,
  },
]

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState("allNews")

  return (
    <div className="mt-6 px-4 pb-20">
      <h2 className="text-lg font-semibold mb-3">News</h2>

      {/* Tabs - Updated with the new highlight color #87E51A */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-1 text-sm rounded-full ${
            activeTab === "allNews" ? "bg-[#87E51A] text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("allNews")}
        >
          All News
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-full ${
            activeTab === "trending" ? "bg-[#87E51A] text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("trending")}
        >
          Trending
        </button>
        <button
          className={`px-4 py-1 text-sm rounded-full ${
            activeTab === "forum" ? "bg-[#87E51A] text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("forum")}
        >
          Forum
        </button>
      </div>

      {/* News items */}
      <div className="space-y-6">
        {newsData.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-3">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src={item.avatar || "/placeholder.svg"}
                  alt={item.author}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{item.author}</div>
                <div className="text-xs text-gray-500">{item.timeAgo}</div>
              </div>
            </div>

            <p className="text-gray-800 mb-3">{item.content}</p>

            <div className="flex items-center text-gray-500 text-sm">
              <button className="flex items-center mr-4">
                <Heart className="h-4 w-4 mr-1" />
                <span>{(item.likes / 1000).toFixed(1)}K</span>
              </button>
              <button className="flex items-center mr-4">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{item.comments}</span>
              </button>
              <button>
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

