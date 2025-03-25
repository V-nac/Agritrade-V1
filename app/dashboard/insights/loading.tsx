export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse mr-4"></div>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <div className="px-4 py-5 space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

