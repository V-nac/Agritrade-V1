"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Home, User, ShoppingBag, InboxIcon, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface MenuLink {
  href: string
  label: string
  icon: React.ReactNode
  color?: string
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = getBrowserClient()

  const menuLinks: MenuLink[] = [
    {
      href: "/dashboard",
      label: "Home",
      icon: <Home className="w-6 h-6 text-[#22C55E]" />,
    },
    {
      href: "/profile",
      label: "My Profile",
      icon: <User className="w-6 h-6 text-[#22C55E]" />,
    },
    {
      href: "/orders",
      label: "My Orders",
      icon: <ShoppingBag className="w-6 h-6 text-[#22C55E]" />,
    },
    {
      href: "/inbox",
      label: "Inbox",
      icon: <InboxIcon className="w-6 h-6 text-[#22C55E]" />,
    },
    {
      href: "/help",
      label: "Help & Support",
      icon: <HelpCircle className="w-6 h-6 text-[#22C55E]" />,
    },
    {
      href: "/auth",
      label: "Log Out",
      icon: <LogOut className="w-6 h-6 text-[#22C55E]" />,
      color: "text-[#22C55E]",
    },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth")
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Toggle menu">
        <Menu className="h-6 w-6 text-gray-700" />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </Link>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="divide-y">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  {link.label === "Log Out" ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        {link.icon}
                        <span className={cn("ml-4 font-medium", link.color)}>{link.label}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center justify-between p-4 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        {link.icon}
                        <span
                          className={cn(
                            "ml-4 font-medium",
                            pathname === link.href ? "text-[#22C55E]" : "text-gray-800",
                          )}
                        >
                          {link.label}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-center text-gray-500 text-sm">Version 1.0.0</div>
        </div>
      </div>
    </>
  )
}

