import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"

export default function VerificationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center p-4 bg-white">
        <div className="flex items-center gap-2">
          <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={40} height={40} className="object-contain" />
          <h1 className="text-4xl font-medium text-stone-700">Agritrade</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-lime-600" />
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mb-2">Check your email</h2>
          <p className="text-stone-600 mb-6">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify
            your account.
          </p>

          <Link
            href="/auth"
            className="inline-block w-full py-3 bg-lime-500 text-stone-900 font-medium rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors"
          >
            Back to login
          </Link>

          <p className="mt-6 text-sm text-gray-600">
            Didn't receive an email? Check your spam folder or{" "}
            <Link href="/auth" className="text-lime-600 hover:underline">
              try another email address
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

