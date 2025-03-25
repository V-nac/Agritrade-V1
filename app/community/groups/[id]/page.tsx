"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Users, MessageSquare, Settings, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Sample data
const sampleCommunity = {
  id: "1",
  name: "Commodity Trading Pros",
  description: "A community for professional commodity traders to share insights and strategies. Join us to learn from experienced traders and discuss market trends.",
  memberCount: 1250,
  image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
  members: [
    {
      id: "1",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "Admin"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Moderator"
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      role: "Member"
    }
  ],
  discussions: [
    {
      id: "1",
      title: "Market Analysis: Gold Trends Q1 2024",
      content: "Let's discuss the current trends in gold markets and potential opportunities...",
      author: {
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
      },
      likes: 24,
      comments: 8,
      createdAt: "2024-03-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Oil Price Predictions for 2024",
      content: "Share your thoughts on where oil prices are headed this year...",
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      likes: 18,
      comments: 12,
      createdAt: "2024-03-14T15:30:00Z"
    }
  ]
}

export default function CommunityPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState<"discussions" | "members">("discussions")
  const [isJoined, setIsJoined] = useState(false)

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Community</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Community Banner */}
      <div className="relative h-48 md:h-64 bg-gray-900">
        <img
          src={sampleCommunity.image}
          alt={sampleCommunity.name}
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{sampleCommunity.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1" />
              <span>{sampleCommunity.memberCount} members</span>
            </div>
            <button
              onClick={() => setIsJoined(!isJoined)}
              className={`px-4 py-1 rounded-full border ${
                isJoined
                  ? "bg-white/10 border-white/20 hover:bg-white/20"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isJoined ? "Joined" : "Join Community"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Description */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-gray-600">{sampleCommunity.description}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "discussions"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("discussions")}
            >
              Discussions
            </button>
            <button
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "members"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "discussions" ? (
          <div className="space-y-4">
            {/* New Discussion Button */}
            <div className="mb-6">
              <button
                onClick={() => router.push("/community/forum/new")}
                className="flex items-center gap-2 px-4 py-2 bg-[#15803D] text-white rounded-md hover:bg-[#166534] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>New Discussion</span>
              </button>
            </div>

            {/* Discussions List */}
            {sampleCommunity.discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{discussion.author.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(discussion.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {discussion.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">{discussion.content}</p>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{discussion.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* Members List */}
            <div className="divide-y">
              {sampleCommunity.members.map((member) => (
                <div key={member.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  {member.role === "Member" && (
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Message
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
} 