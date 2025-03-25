"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Apple, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { getBrowserClient } from "@/lib/supabase"

export function SignupForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"farmer" | "consumer">("consumer")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getBrowserClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms of service")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
          },
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Update the profile with additional information
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
          })
          .eq("id", data.user.id)

        if (profileError) {
          console.error("Error updating profile:", profileError)
        }
      }

      router.push("/auth/verification")
    } catch (error: any) {
      setError(error.message || "Failed to sign up")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign up with Google")
      setIsLoading(false)
    }
  }

  const handleAppleSignup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign up with Apple")
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Create an account</h2>
      <p className="text-stone-600 mb-6">Enter your information to create an account</p>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-stone-700 mb-1">
              First name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-stone-700 mb-1">
              Last name
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-stone-700 mb-1">
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">I am a:</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lime-500"
                name="user-type"
                value="farmer"
                checked={userType === "farmer"}
                onChange={() => setUserType("farmer")}
              />
              <span className="ml-2">Farmer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lime-500"
                name="user-type"
                value="consumer"
                checked={userType === "consumer"}
                onChange={() => setUserType("consumer")}
              />
              <span className="ml-2">Consumer</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-lime-500 border-gray-300 rounded focus:ring-lime-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-lime-600 hover:underline">
                terms of service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-lime-600 hover:underline">
                privacy policy
              </a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-lime-500 text-stone-900 font-medium rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign up"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </button>
          <button
            onClick={handleAppleSignup}
            disabled={isLoading}
            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            <Apple className="h-5 w-5 mr-2" />
            Apple
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => document.getElementById("login-tab")?.click()}
          className="text-lime-600 hover:underline font-medium"
        >
          Log in
        </button>
      </p>
    </div>
  )
}

