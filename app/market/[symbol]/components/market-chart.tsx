"use client"

import { useRef } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartOptions,
  Chart,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

interface MarketChartProps {
  data: {
    labels: string[]
    prices: number[]
  }
  priceChange: number
}

export default function MarketChart({ data, priceChange }: MarketChartProps) {
  const chartRef = useRef<Chart<"line">>(null)

  const chartColor = priceChange >= 0 ? "#15803D" : "#EF4444"
  const chartBgColor = priceChange >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Price",
        data: data.prices,
        borderColor: chartColor,
        backgroundColor: chartBgColor,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: chartColor,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 15,
        right: 5,
        top: 10,
        bottom: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
          color: "#9CA3AF",
          font: {
            size: 10,
          },
        },
        bounds: "ticks",
        offset: true,
      },
      y: {
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          callback: (value) => typeof value === 'number' ? value.toFixed(2) : value,
          color: "#9CA3AF",
          font: {
            size: 10,
          },
        },
        position: "right",
        beginAtZero: false,
        grace: "5%",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
  }

  return (
    <div className="h-64 w-full">
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        redraw={true}
      />
    </div>
  )
}

