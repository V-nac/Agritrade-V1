"use client"

import type { Dispatch, SetStateAction } from "react"

interface AuthTabsProps {
  activeTab: "login" | "signup"
  setActiveTab: Dispatch<SetStateAction<"login" | "signup">>
}

export function AuthTabs({ activeTab, setActiveTab }: AuthTabsProps) {
  return (
    <div className="flex rounded-lg overflow-hidden bg-green-100">
      <button
        className={`flex-1 py-3 text-center font-medium transition-colors ${
          activeTab === "login" ? "bg-green-100 text-stone-900" : "bg-white text-stone-900"
        }`}
        onClick={() => setActiveTab("login")}
      >
        Log in
      </button>
      <button
        className={`flex-1 py-3 text-center font-medium transition-colors ${
          activeTab === "signup" ? "bg-green-100 text-stone-900" : "bg-white text-stone-900"
        }`}
        onClick={() => setActiveTab("signup")}
      >
        Sign up
      </button>
    </div>
  )
}

