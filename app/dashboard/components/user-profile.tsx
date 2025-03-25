import Image from "next/image"

interface UserProfileProps {
  user: any
  profile: any
}

export default function UserProfile({ user, profile }: UserProfileProps) {
  const firstName = profile?.first_name || "User"
  const lastName = profile?.last_name || ""
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : user?.email?.split("@")[0] || "User"

  // Mock balance for demo purposes
  const balance = 10000

  return (
    <div className="px-4 py-5 bg-white">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-3">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url || "/placeholder.svg"}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-600">{displayName.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold">{displayName}</h2>
        <p className="text-gray-600 mb-4">Available Balance: ${balance.toLocaleString()}</p>

        <button className="w-full py-3 bg-green-50 text-gray-800 font-medium rounded-full hover:bg-green-100 transition-colors">
          Add Funds
        </button>
      </div>
    </div>
  )
}

