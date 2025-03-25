"use client"

interface TimeframeSelectorProps {
  activeTimeframe: string
  onTimeframeChange: (timeframe: "1H" | "4H" | "1D" | "1W" | "1M" | "1Y") => void
}

export default function TimeframeSelector({ activeTimeframe, onTimeframeChange }: TimeframeSelectorProps) {
  const timeframes = [
    { value: "1H", label: "1H" },
    { value: "4H", label: "4H" },
    { value: "1D", label: "1D" },
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "1Y", label: "1Y" },
  ]

  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg">
      {timeframes.map((tf) => (
        <button
          key={tf.value}
          onClick={() => onTimeframeChange(tf.value as "1H" | "4H" | "1D" | "1W" | "1M" | "1Y")}
          className={`
            relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200
            ${
              activeTimeframe === tf.value
                ? "text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          {activeTimeframe === tf.value && (
            <div
              className="absolute inset-0 bg-white rounded-md shadow-sm transition-all duration-200"
              style={{ zIndex: 0 }}
            />
          )}
          <span className="relative z-10">{tf.label}</span>
        </button>
      ))}
    </div>
  )
}

