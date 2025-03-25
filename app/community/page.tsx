"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus } from "lucide-react"
import ForumPostList from "./components/forum-post-list"
import CommunityList from "./components/community-list"

// Sample data
const samplePosts = [
  {
    id: "1",
    title: "Best strategies for commodity trading in 2024",
    content: "I've been trading commodities for the past 5 years and wanted to share some insights...",
    author: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    likes: 42,
    comments: 15,
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Market analysis: Impact of global events on commodity prices",
    content: "Recent geopolitical events have significantly affected commodity markets...",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    likes: 38,
    comments: 21,
    createdAt: "2024-03-14T15:30:00Z"
  }
]

const sampleCommunities = [
  {
    id: "1",
    name: "Commodity Trading Pros",
    description: "A community for professional commodity traders to share insights and strategies.",
    memberCount: 1250,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "2",
    name: "Agricultural Markets",
    description: "Discuss trends and opportunities in agricultural commodity markets.",
    memberCount: 850,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
  }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"forum" | "communities">("forum")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
            {activeTab === "forum" && (
              <button
                onClick={() => router.push("/community/forum/new")}
                className="flex items-center gap-2 px-4 py-2 bg-[#15803D] text-white rounded-md hover:bg-[#166534] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "forum" ? "posts" : "communities"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "forum"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("forum")}
            >
              Forum
            </button>
            <button
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "communities"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("communities")}
            >
              Communities
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "forum" ? (
          <ForumPostList posts={samplePosts} />
        ) : (
          <CommunityList communities={sampleCommunities} />
        )}
      </main>
    </>
  )
} 