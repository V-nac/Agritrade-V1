"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
  createdAt: string
}

interface ForumPostListProps {
  posts: Post[]
}

export default function ForumPostList({ posts }: ForumPostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/community/forum/${post.id}`}
          className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 