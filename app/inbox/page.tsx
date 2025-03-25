"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Check, Trash2, CheckCheck } from "lucide-react"
import { useNotifications, type Notification } from "@/context/notification-context"
import { formatDistanceToNow } from "date-fns"

export default function InboxPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  // Try to access notification context safely
  const notificationContext = useNotifications()

  useEffect(() => {
    setMounted(true)

    // If context is available, initialize state from it
    if (notificationContext) {
      setNotifications(notificationContext.notifications || [])
      setUnreadCount(notificationContext.unreadCount || 0)
    }

    return () => setMounted(false)
  }, [notificationContext])

  // Apply filter to notifications
  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((notification) => !notification.isRead)

  // Safe wrapper functions for context methods
  const markAsRead = (id: string) => {
    if (notificationContext?.markAsRead) {
      notificationContext.markAsRead(id)
      // Update local state to reflect changes
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const markAllAsRead = () => {
    if (notificationContext?.markAllAsRead) {
      notificationContext.markAllAsRead()
      // Update local state to reflect changes
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
      setUnreadCount(0)
    }
  }

  const deleteNotification = (id: string) => {
    if (notificationContext?.deleteNotification) {
      notificationContext.deleteNotification(id)
      // Update local state to reflect changes
      const updatedNotifications = notifications.filter((notification) => notification.id !== id)
      setNotifications(updatedNotifications)
      setUnreadCount(updatedNotifications.filter((n) => !n.isRead).length)
    }
  }

  const clearAllNotifications = () => {
    if (notificationContext?.clearAllNotifications) {
      notificationContext.clearAllNotifications()
      // Update local state to reflect changes
      setNotifications([])
      setUnreadCount(0)
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order_filled":
        return <Bell className="h-6 w-6 text-[#22C55E]" />
      case "price_alert":
        return <Bell className="h-6 w-6 text-yellow-500" />
      case "system":
        return <Bell className="h-6 w-6 text-blue-500" />
      case "news":
        return <Bell className="h-6 w-6 text-purple-500" />
      default:
        return <Bell className="h-6 w-6 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch (e) {
      return "some time ago"
    }
  }

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mr-3"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex border-b">
            <div className="flex-1 py-2 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex-1 py-2 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Inbox</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="p-2 text-gray-600 hover:text-[#22C55E]"
              aria-label="Mark all as read"
            >
              <CheckCheck className="h-5 w-5" />
            </button>
            <button
              onClick={clearAllNotifications}
              className="p-2 text-gray-600 hover:text-red-500"
              aria-label="Clear all notifications"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              filter === "all" ? "text-[#22C55E] border-b-2 border-[#22C55E]" : "text-gray-600"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              filter === "unread" ? "text-[#22C55E] border-b-2 border-[#22C55E]" : "text-gray-600"
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
        </div>
      </header>

      {/* Notification list */}
      <main className="flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Bell className="h-12 w-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm">
              {filter === "unread" ? "You have no unread notifications" : "Your notifications will appear here"}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li key={notification.id} className={`relative ${notification.isRead ? "bg-white" : "bg-green-50"}`}>
                <div className="flex p-4">
                  <div className="flex-shrink-0 mr-4">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                      <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="mt-2 flex justify-end space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-[#22C55E] flex items-center"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-500 flex items-center"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

