"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Mock data for demonstration
const transactionsData = [
  { id: 1, type: "BOUGHT", item: "CORN", amount: 91.0 },
  { id: 2, type: "SOLD", item: "SOYBEAN", amount: 101.0 },
  { id: 3, type: "BOUGHT", item: "CORN", amount: 89.0 },
]

export default function RecentTransactions() {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="mt-4 px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button onClick={toggleVisibility}>
          {isVisible ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {isVisible && (
        <div className="space-y-3">
          {transactionsData.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">🌾</span>
                </div>
                <div>
                  <div className="font-medium">{transaction.type}</div>
                  <div className="text-sm text-green-600">{transaction.item}</div>
                </div>
              </div>
              <div className="font-medium">${transaction.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

