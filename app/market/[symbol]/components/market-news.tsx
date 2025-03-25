import { Clock, Newspaper } from "lucide-react"

interface NewsItem {
  id: number
  source: string
  title: string
  summary: string
  timeAgo: string
  url: string
}

interface MarketNewsProps {
  news: NewsItem[]
  symbol: string
}

export default function MarketNews({ news, symbol }: MarketNewsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Latest {symbol} News</h3>
      <div className="space-y-5">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="bg-[#22C55E]/10 p-2 rounded-lg mt-1">
                <Newspaper className="h-5 w-5 text-[#15803D]" />
              </div>
              <div>
                <div className="text-sm text-[#15803D] font-medium">{item.source}</div>
                <h4 className="font-medium text-gray-900 mt-1 hover:text-[#15803D] transition-colors cursor-pointer">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-[#15803D] hover:text-[#22C55E] transition-colors">View all news</button>
      </div>
    </div>
  )
}

