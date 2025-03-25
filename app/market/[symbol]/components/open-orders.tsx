import { ArrowDown, ArrowUp, Clock, X } from "lucide-react"

interface Order {
  id: number
  type: "market" | "limit"
  direction: "buy" | "sell"
  price: number
  size: number
  value: number
  timestamp: string
  status: "pending" | "partial" | "filled" | "canceled"
  progress: string
}

interface OpenOrdersProps {
  orders: Order[]
  symbol: string
}

export default function OpenOrders({ orders, symbol }: OpenOrdersProps) {
  // Filter orders to only show pending orders with 0% progress
  const pendingOrders = orders.filter((order) => order.status === "pending" && order.progress === "0%")

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Open Orders</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-3 mb-3">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-1">No open orders for {symbol}</p>
          <p className="text-sm text-gray-400">Your active orders will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Open Orders</h3>
        <span className="text-sm bg-[#22C55E]/10 text-[#15803D] px-2 py-1 rounded-full">
          {pendingOrders.length} Active
        </span>
      </div>

      {pendingOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-3 mb-3">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-1">No pending orders for {symbol}</p>
          <p className="text-sm text-gray-400">Your active orders will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle px-6">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="w-16"></th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size<span className="text-xs lowercase">/kg</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-2">
                        <button
                          className="w-12 h-8 bg-red-100 text-red-500 rounded flex items-center justify-center hover:bg-red-200 transition-colors"
                          title="Cancel order"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                              order.direction === "buy" ? "bg-[#22C55E]/10" : "bg-red-100"
                            }`}
                          >
                            {order.direction === "buy" ? (
                              <ArrowUp className="h-4 w-4 text-[#15803D]" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <div
                              className={`text-sm font-medium ${
                                order.direction === "buy" ? "text-[#15803D]" : "text-red-500"
                              }`}
                            >
                              {order.direction.toUpperCase()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${order.price.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.size}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.value.toFixed(2)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {pendingOrders.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button className="text-sm text-[#15803D] hover:text-[#22C55E] transition-colors">View all orders</button>
        </div>
      )}
    </div>
  )
}

