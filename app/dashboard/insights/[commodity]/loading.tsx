export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="ml-4 h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </header>

      <div className="px-4 py-5">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>

        <div className="flex justify-center mb-8">
          <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse mb-8"></div>

        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>

        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse mb-8"></div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-40 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}

