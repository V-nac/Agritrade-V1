"use client"

import Link from "next/link"
import { Users } from "lucide-react"

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  image: string
}

interface CommunityListProps {
  communities: Community[]
}

export default function CommunityList({ communities }: CommunityListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {communities.map((community) => (
        <Link
          key={community.id}
          href={`/community/groups/${community.id}`}
          className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={community.image}
              alt={community.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{community.name}</h3>
            <p className="text-gray-600 line-clamp-2 mb-4">{community.description}</p>
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">{community.memberCount} members</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 