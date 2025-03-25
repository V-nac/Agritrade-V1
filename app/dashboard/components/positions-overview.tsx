"use client"

import { useState } from "react"
import { Clock } from "lucide-react"

// Mock data for open orders - only pending orders
const openOrdersData = [
  {
    id: 2,
    type: "sell",
    status: "pending",
    commodity: "Corn",
    quantity: 300,
    price: 4.15,
    total: 1245.0,
    created: "6/11/2023 5:15:00 PM",
  },
  {
    id: 3,
    type: "buy",
    status: "pending",
    commodity: "Rice",
    quantity: 200,
    price: 2.5,
    total: 500.0,
    created: "6/12/2023 3:20:00 PM",
  },
]

// Confirmation Dialog Component
function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">Cancel All Orders</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel all pending orders? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            No, Keep Orders
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Yes, Cancel All
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PositionsOverview() {
  const [orders, setOrders] = useState(openOrdersData)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleCancelAll = () => {
    setOrders([])
  }

  return (
    <div className="mt-4 px-4">
      <div className="bg-white rounded-lg p-3 shadow-sm">
        {/* Open Orders section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#1c170d]">Open Orders ({orders.length})</h3>
            {orders.length > 0 && (
              <button
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200"
                onClick={() => setShowConfirmDialog(true)}
              >
                Cancel All
              </button>
            )}
          </div>

          <div className="border-t-2 border-[#22C55E] w-16 mb-4"></div>

          {orders.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>No pending orders</p>
              <p className="text-sm mt-1">Your pending orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-3 border-b border-gray-200">
                    <div
                      className={`font-medium text-lg ${order.type === "buy" ? "text-[#22C55E]" : "text-orange-500"}`}
                    >
                      {order.type.toUpperCase()}
                    </div>
                    <div className="flex items-center text-orange-500">
                      <Clock className="h-5 w-5 mr-1" />
                      <span>Pending</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-gray-600">Commodity:</div>
                      <div className="text-right font-medium">{order.commodity}</div>

                      <div className="text-gray-600">Quantity:</div>
                      <div className="text-right font-medium">{order.quantity}</div>

                      <div className="text-gray-600">Price:</div>
                      <div className="text-right font-medium">${order.price.toFixed(2)}</div>

                      <div className="text-gray-600">Total:</div>
                      <div className="text-right font-medium">${order.total.toFixed(2)}</div>

                      <div className="text-gray-600">Created:</div>
                      <div className="text-right text-sm">{order.created}</div>
                    </div>

                    <button
                      className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setOrders(orders.filter((o) => o.id !== order.id))
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleCancelAll}
      />
    </div>
  )
}

