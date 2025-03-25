"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getBrowserClient } from "@/lib/supabase"

export interface Notification {
  id: string
  type: "order_filled" | "price_alert" | "system" | "news"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  data?: any
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const supabase = getBrowserClient()

  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  // Fetch notifications from local storage on initial render
  useEffect(() => {
    const savedNotifications = localStorage.getItem("agritrade-notifications")

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications))
      } catch (e) {
        console.error("Failed to parse notifications from localStorage", e)
        // Initialize with demo notifications if parsing fails
        setNotifications(getDemoNotifications())
      }
    } else {
      // Initialize with demo notifications if none exist
      setNotifications(getDemoNotifications())
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("agritrade-notifications", JSON.stringify(notifications))
  }, [notifications])

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Helper function to generate demo notifications
function getDemoNotifications(): Notification[] {
  return [
    {
      id: "1",
      type: "order_filled",
      title: "Order Filled",
      message: "Your limit order to buy 50kg of Rice at $2.20/kg has been filled.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      isRead: false,
      data: {
        orderId: "ORD-12345",
        commodity: "Rice",
        quantity: "50kg",
        price: "$2.20/kg",
      },
    },
    {
      id: "2",
      type: "price_alert",
      title: "Price Alert",
      message: "Wheat has increased by 5% in the last 24 hours.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      isRead: true,
      data: {
        commodity: "Wheat",
        changePercent: "5%",
        direction: "up",
      },
    },
    {
      id: "3",
      type: "system",
      title: "Account Verified",
      message: "Your account has been successfully verified. You can now trade on Agritrade.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      isRead: true,
    },
    {
      id: "4",
      type: "news",
      title: "Market Update",
      message: "New government policies affecting rice exports have been announced.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      isRead: false,
    },
    {
      id: "5",
      type: "order_filled",
      title: "Order Filled",
      message: "Your limit order to sell 100kg of Corn at $1.85/kg has been filled.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      isRead: true,
      data: {
        orderId: "ORD-12346",
        commodity: "Corn",
        quantity: "100kg",
        price: "$1.85/kg",
      },
    },
  ]
}

