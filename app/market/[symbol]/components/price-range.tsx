interface PriceRangeProps {
  low: number
  high: number
  current: number
}

export default function PriceRange({ low, high, current }: PriceRangeProps) {
  // Calculate position percentage
  const range = high - low
  const position = ((current - low) / range) * 100

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between mb-2">
        <div className="text-sm font-medium text-gray-700">24h Range</div>
        <div className="text-sm text-gray-500">
          ${low.toFixed(2)} - ${high.toFixed(2)}
        </div>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div className="absolute top-0 left-0 h-2 bg-[#22C55E]/20 rounded-full" style={{ width: `${position}%` }}></div>
        <div
          className="absolute top-0 h-4 w-4 bg-[#15803D] rounded-full -mt-1 transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <div className="text-gray-500">${low.toFixed(2)}</div>
        <div className="text-[#15803D] font-medium">${current.toFixed(2)}</div>
        <div className="text-gray-500">${high.toFixed(2)}</div>
      </div>
    </div>
  )
}

