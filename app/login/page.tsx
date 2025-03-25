import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center text-stone-700">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={30} height={30} className="object-contain" />
          <span className="text-2xl font-medium text-stone-700">Agritrade</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
          <p className="text-stone-600">Log in to continue to Agritrade</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" className="border-stone-300" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-lime-600">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" className="border-stone-300" />
          </div>
          <Button className="w-full bg-lime-500 hover:bg-lime-600 text-stone-900 font-medium py-6">Log in</Button>
        </form>

        <div className="mt-auto pt-8 text-center">
          <p className="text-stone-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-lime-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

