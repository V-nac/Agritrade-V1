"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ThumbsUp, MessageSquare, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Sample data
const samplePost = {
  id: "1",
  title: "Best strategies for commodity trading in 2024",
  content: "I've been trading commodities for the past 5 years and wanted to share some insights that I've gained along the way. The most important lessons I've learned are:\n\n1. Always do your research\n2. Understand market fundamentals\n3. Manage your risk properly\n4. Stay updated with global events\n5. Be patient with your trades",
  author: {
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  likes: 42,
  comments: [
    {
      id: "1",
      content: "Great insights! Could you elaborate more on risk management strategies?",
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      likes: 8,
      createdAt: "2024-03-15T11:30:00Z"
    },
    {
      id: "2",
      content: "I've found that setting stop losses at key technical levels works well.",
      author: {
        name: "Mike Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
      },
      likes: 5,
      createdAt: "2024-03-15T12:15:00Z"
    }
  ],
  createdAt: "2024-03-15T10:00:00Z"
}

export default function PostPage() {
  const router = useRouter()
  const params = useParams()
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the comment
    console.log("Submitting comment:", comment)
    setComment("")
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Discussion</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          {/* Post Content */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={samplePost.author.avatar}
                alt={samplePost.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{samplePost.author.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(samplePost.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{samplePost.title}</h2>
            <div className="prose max-w-none mb-6">
              {samplePost.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-gray-500">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 ${
                  isLiked ? "text-[#15803D]" : ""
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{isLiked ? samplePost.likes + 1 : samplePost.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-5 h-5" />
                <span>{samplePost.comments.length}</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="px-4 py-2 bg-[#15803D] text-white rounded-md hover:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {samplePost.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <button className="hover:text-gray-700">Like</button>
                      <span>•</span>
                      <span>{comment.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 