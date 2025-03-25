import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function SignupPage() {
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
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Create account</h1>
          <p className="text-stone-600">Sign up to start trading agricultural products</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Your name" className="border-stone-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" className="border-stone-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="border-stone-300" />
          </div>

          <div className="space-y-2">
            <Label>I am a:</Label>
            <RadioGroup defaultValue="farmer" className="flex">
              <div className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value="farmer" id="farmer" />
                <Label htmlFor="farmer">Farmer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer">Buyer</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full bg-lime-500 hover:bg-lime-600 text-stone-900 font-medium py-6">
            Create account
          </Button>
        </form>

        <div className="mt-auto pt-8 text-center">
          <p className="text-stone-600">
            Already have an account?{" "}
            <Link href="/login" className="text-lime-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

