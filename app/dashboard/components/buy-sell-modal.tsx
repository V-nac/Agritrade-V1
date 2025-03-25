"use client"

import type React from "react"

import { useState } from "react"
import { BottomSheet } from "@/components/ui/modal"
import { ChevronDown, ChevronUp, DollarSign, ArrowRight } from "lucide-react"

interface BuySellModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "buy" | "sell"
}

export default function BuySellModal({ isOpen, onClose, initialMode = "buy" }: BuySellModalProps) {
  const [mode, setMode] = useState<"buy" | "sell">(initialMode)
  const [selectedCommodity, setSelectedCommodity] = useState({
    name: "Wheat",
    price: 0.32,
    change: -2.02,
    unit: "kg",
  })
  const [quantity, setQuantity] = useState(100)
  const [showCommoditySelector, setShowCommoditySelector] = useState(false)

  const commodities = [
    { name: "Wheat", price: 0.32, change: -2.02, unit: "kg" },
    { name: "Corn", price: 0.24, change: 1.02, unit: "kg" },
    { name: "Rice", price: 0.45, change: 0.75, unit: "kg" },
    { name: "Oats", price: 0.28, change: -1.15, unit: "kg" },
    { name: "Barley", price: 0.26, change: 0.88, unit: "kg" },
  ]

  const totalPrice = (quantity * selectedCommodity.price).toFixed(2)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setQuantity(value)
    }
  }

  const handleSubmit = () => {
    console.log(
      `${mode === "buy" ? "Buying" : "Selling"} ${quantity} ${
        selectedCommodity.unit
      } of ${selectedCommodity.name} for $${totalPrice}`,
    )
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={mode === "buy" ? "Buy Commodity" : "Sell Commodity"}>
      <div className="p-4">
        <div className="mb-6 flex rounded-lg bg-gray-100">
          <button
            className={`flex-1 rounded-lg py-3 text-center font-medium ${
              mode === "buy" ? "bg-[#22C55E] text-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setMode("buy")}
          >
            Buy
          </button>
          <button
            className={`flex-1 rounded-lg py-3 text-center font-medium ${
              mode === "sell" ? "bg-[#22C55E] text-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setMode("sell")}
          >
            Sell
          </button>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">Select Commodity</label>
          <button
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-3"
            onClick={() => setShowCommoditySelector(!showCommoditySelector)}
          >
            <div className="flex items-center">
              <div className="mr-3 h-8 w-8 rounded-full bg-[#22C55E]/10"></div>
              <div>
                <div className="font-medium">{selectedCommodity.name}</div>
                <div className={`text-sm ${selectedCommodity.change >= 0 ? "text-[#22C55E]" : "text-red-500"}`}>
                  ${selectedCommodity.price}/{selectedCommodity.unit}
                  <span className="inline-flex items-center ml-1">
                    <span
                      className={`inline-flex justify-center items-center w-4 h-4 rounded ${
                        selectedCommodity.change >= 0 ? "bg-[#22C55E] text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {selectedCommodity.change >= 0 ? "+" : "-"}
                    </span>
                    <span className="ml-1">{Math.abs(selectedCommodity.change)}%</span>
                  </span>
                </div>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>

          {showCommoditySelector && (
            <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {commodities.map((commodity, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between border-b border-gray-100 p-3 last:border-0 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedCommodity(commodity)
                    setShowCommoditySelector(false)
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 rounded-full bg-[#22C55E]/10"></div>
                    <div>
                      <div className="font-medium">{commodity.name}</div>
                      <div className={`text-sm ${commodity.change >= 0 ? "text-[#22C55E]" : "text-red-500"}`}>
                        ${commodity.price}/{commodity.unit}
                        <span className="inline-flex items-center ml-1">
                          <span
                            className={`inline-flex justify-center items-center w-4 h-4 rounded ${
                              commodity.change >= 0 ? "bg-[#22C55E] text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {commodity.change >= 0 ? "+" : "-"}
                          </span>
                          <span className="ml-1">{Math.abs(commodity.change)}%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
            Quantity ({selectedCommodity.unit})
          </label>
          <div className="relative">
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full rounded-lg border border-gray-300 p-3 pr-20 focus:border-[#22C55E] focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
            />
            <div className="absolute inset-y-0 right-0 flex">
              <button
                className="flex h-full w-10 items-center justify-center border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(0, quantity - 10))}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                className="flex h-full w-10 items-center justify-center border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 10)}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Price per {selectedCommodity.unit}</span>
            <span className="font-medium">${selectedCommodity.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Total</span>
            <span className="text-xl font-bold">${totalPrice}</span>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-blue-800">
          <div className="flex items-start">
            <DollarSign className="mr-2 h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              {mode === "buy"
                ? "You are about to buy agricultural commodities. Please ensure you have sufficient funds in your wallet."
                : "You are about to sell agricultural commodities. Please ensure you have sufficient quantity in your inventory."}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center rounded-lg bg-[#22C55E] py-3 font-medium text-white"
        >
          {mode === "buy" ? "Buy" : "Sell"} Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </BottomSheet>
  )
}

