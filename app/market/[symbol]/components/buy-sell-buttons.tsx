"use client"

import { useState } from "react"
import BuySellModal from "@/app/dashboard/components/buy-sell-modal"

interface BuySellButtonsProps {
  commodity: any
}

export default function BuySellButtons({ commodity }: BuySellButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"buy" | "sell">("buy")

  const handleBuy = () => {
    setModalMode("buy")
    setIsModalOpen(true)
  }

  const handleSell = () => {
    setModalMode("sell")
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleBuy}
          className="py-3.5 bg-[#15803D] text-white font-medium rounded-lg hover:bg-[#22C55E] transition-colors"
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          className="py-3.5 border-2 border-[#15803D] text-[#15803D] font-medium rounded-lg hover:bg-[#15803D]/5 transition-colors"
        >
          Sell
        </button>
      </div>

      {isModalOpen && (
        <BuySellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialMode={modalMode} />
      )}
    </>
  )
}

