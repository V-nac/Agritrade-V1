"use client"

interface TimeframeSelectorProps {
  activeTimeframe: string
  onTimeframeChange: (timeframe: any) => void
}

export default function TimeframeSelector({ activeTimeframe, onTimeframeChange }: TimeframeSelectorProps) {
  const timeframes = [
    { label: "1H", value: "1H" },
    { label: "4H", value: "4H" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "1Y", value: "1Y" },
  ]

  return (
    <div className="flex space-x-2 overflow-x-auto pb-1">
      {timeframes.map((tf) => (
        <button
          key={tf.value}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTimeframe === tf.value ? "bg-[#15803D] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onTimeframeChange(tf.value)}
        >
          {tf.label}
        </button>
      ))}
    </div>
  )
}

