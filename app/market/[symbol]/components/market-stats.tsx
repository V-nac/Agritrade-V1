interface MarketStatsProps {
  bid: number
  ask: number
  dayHigh: number
  dayLow: number
  volume: string
  prevClose: number
  unit: string
}

export default function MarketStats({ bid, ask, dayHigh, dayLow, volume, prevClose, unit }: MarketStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">Bid</div>
        <div className="font-medium text-gray-900">
          ${bid.toFixed(2)}/{unit}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">Ask</div>
        <div className="font-medium text-gray-900">
          ${ask.toFixed(2)}/{unit}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">24h High</div>
        <div className="font-medium text-gray-900">
          ${dayHigh.toFixed(2)}/{unit}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">24h Low</div>
        <div className="font-medium text-gray-900">
          ${dayLow.toFixed(2)}/{unit}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">Volume</div>
        <div className="font-medium text-gray-900">{volume}</div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="text-sm text-gray-500 mb-1">Prev Close</div>
        <div className="font-medium text-gray-900">
          ${prevClose.toFixed(2)}/{unit}
        </div>
      </div>
    </div>
  )
}

