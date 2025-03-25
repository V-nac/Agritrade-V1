"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  fullScreen?: boolean
}

export function Modal({ isOpen, onClose, children, title, fullScreen = false }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      document.body.style.overflow = ""
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "fixed bg-white transition-all duration-300 ease-in-out",
          fullScreen ? "inset-0" : "left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg",
          isOpen
            ? fullScreen
              ? "translate-y-0"
              : "-translate-y-1/2"
            : fullScreen
              ? "translate-y-full"
              : "translate-y-[60%] opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export function BottomSheet({ isOpen, onClose, children, title }: Omit<ModalProps, "fullScreen">) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      document.body.style.overflow = ""
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 rounded-t-xl bg-white transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gray-300" />
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="max-h-[80vh] overflow-y-auto pb-safe">{children}</div>
      </div>
    </div>
  )
}

