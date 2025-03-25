"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"

// Mock data for orders
const ordersData = [
  {
    id: "ORD-7856",
    status: "pending",
    date: "Jan 15, 2024",
    amount: 249.99,
    details: {
      commodity: "Wheat",
      quantity: 100,
      price: 2.5,
      total: 249.99,
      created: "Jan 15, 2024 10:30 AM",
    },
  },
  {
    id: "ORD-7855",
    status: "completed",
    date: "Jan 14, 2024",
    amount: 529.98,
    details: {
      commodity: "Rice",
      quantity: 200,
      price: 2.65,
      total: 529.98,
      created: "Jan 14, 2024 09:15 AM",
      completed: "Jan 14, 2024 02:30 PM",
    },
  },
  {
    id: "ORD-7854",
    status: "cancelled",
    date: "Jan 13, 2024",
    amount: 1299.99,
    details: {
      commodity: "Corn",
      quantity: 500,
      price: 2.6,
      total: 1299.99,
      created: "Jan 13, 2024 11:45 AM",
      cancelled: "Jan 13, 2024 03:20 PM",
      reason: "Price fluctuation",
    },
  },
  {
    id: "ORD-7853",
    status: "completed",
    date: "Jan 12, 2024",
    amount: 159.97,
    details: {
      commodity: "Barley",
      quantity: 50,
      price: 3.2,
      total: 159.97,
      created: "Jan 12, 2024 08:30 AM",
      completed: "Jan 12, 2024 01:15 PM",
    },
  },
  {
    id: "ORD-7852",
    status: "pending",
    date: "Jan 11, 2024",
    amount: 449.99,
    details: {
      commodity: "Soybean",
      quantity: 150,
      price: 3.0,
      total: 449.99,
      created: "Jan 11, 2024 02:45 PM",
    },
  },
  {
    id: "ORD-7851",
    status: "completed",
    date: "Jan 10, 2024",
    amount: 899.99,
    details: {
      commodity: "Rice",
      quantity: 300,
      price: 3.0,
      total: 899.99,
      created: "Jan 10, 2024 10:00 AM",
      completed: "Jan 10, 2024 04:30 PM",
    },
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed" | "cancelled">("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Filter orders based on active tab
  const filteredOrders = activeTab === "all" ? ordersData : ordersData.filter((order) => order.status === activeTab)

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-600"
      case "completed":
        return "bg-green-100 text-green-600"
      case "cancelled":
        return "bg-red-100 text-red-500"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-5 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl text-[#1c170d]">My Orders</h1>
        </div>
      </header>

      {/* Filter tabs */}
      <div className="p-5 grid grid-cols-4 gap-3">
        <button
          className={`py-3 rounded-lg text-center transition-colors ${
            activeTab === "all" ? "bg-[#4caf50] text-white" : "bg-white text-[#4caf50] border border-[#4caf50]"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Orders
        </button>
        <button
          className={`py-3 rounded-lg text-center transition-colors ${
            activeTab === "pending" ? "bg-[#4caf50] text-white" : "bg-white text-[#4caf50] border border-[#4caf50]"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`py-3 rounded-lg text-center transition-colors ${
            activeTab === "completed" ? "bg-[#4caf50] text-white" : "bg-white text-[#4caf50] border border-[#4caf50]"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`py-3 rounded-lg text-center transition-colors ${
            activeTab === "cancelled" ? "bg-[#4caf50] text-white" : "bg-white text-[#4caf50] border border-[#4caf50]"
          }`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
      </div>

      {/* Orders list */}
      <div className="px-5 pb-20 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg">No orders found</p>
            <p className="text-sm">
              {activeTab === "all" ? "You haven't placed any orders yet" : `You don't have any ${activeTab} orders`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#4caf50]">{order.id}</span>
                    <span className={`px-3 py-1 rounded-md text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="text-gray-500 mb-3">{order.date}</div>

                <div className="flex justify-between items-center">
                  <span className="text-[#4caf50] text-xl">${order.amount.toFixed(2)}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedOrder === order.id ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-3">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="text-gray-600">Commodity:</div>
                    <div className="text-right">{order.details.commodity}</div>

                    <div className="text-gray-600">Quantity:</div>
                    <div className="text-right">{order.details.quantity}</div>

                    <div className="text-gray-600">Price:</div>
                    <div className="text-right">${order.details.price.toFixed(2)}</div>

                    <div className="text-gray-600">Total:</div>
                    <div className="text-right">${order.details.total.toFixed(2)}</div>

                    <div className="text-gray-600">Created:</div>
                    <div className="text-right text-sm">{order.details.created}</div>

                    {order.status === "completed" && order.details.completed && (
                      <>
                        <div className="text-gray-600">Completed:</div>
                        <div className="text-right text-sm">{order.details.completed}</div>
                      </>
                    )}

                    {order.status === "cancelled" && order.details.cancelled && (
                      <>
                        <div className="text-gray-600">Cancelled:</div>
                        <div className="text-right text-sm">{order.details.cancelled}</div>

                        {order.details.reason && (
                          <>
                            <div className="text-gray-600">Reason:</div>
                            <div className="text-right text-sm">{order.details.reason}</div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {order.status === "pending" && (
                    <button className="w-full mt-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      Cancel Order
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

