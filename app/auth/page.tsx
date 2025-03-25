"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AuthTabs } from "./auth-tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup")
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center p-4 bg-white">
        <div className="flex items-center gap-2">
          <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={40} height={40} className="object-contain" />
          <h1 className="text-4xl font-medium text-stone-700">Agritrade</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            {activeTab === "login" ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>
    </div>
  )
}

