"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Users, TrendingUp, ShieldCheck } from "lucide-react"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Images for the hero section carousel
  const heroImages = [
    "/images/rice-fields-aerial.webp",
    "/images/cambodia-rice-farmer.webp",
    "/images/farmer-with-buffalo.jpeg",
    "/images/rice-planting.jpeg",
  ]

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={40} height={40} className="object-contain" />
            <h1 className="text-2xl font-bold text-[#1c170d]">Agritrade</h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth"
              className="px-4 py-2 text-[#1c170d] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-[#4caf50] text-white font-medium rounded-lg hover:bg-[#3d8b40] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <Image
                src={image || "/placeholder.svg"}
                alt={`Agricultural scene ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Direct Farm-to-Table Trading</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Connect farmers and consumers directly, cutting out the middleman and ensuring fair prices for all.
            </p>
            <Link
              href="/auth"
              className="flex items-center gap-2 px-6 py-3 bg-[#4caf50] text-white font-medium rounded-lg hover:bg-[#3d8b40] transition-colors"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-[#edf2e8]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1c170d]">Why Choose Agritrade?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#4caf50]/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-[#4caf50]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1c170d]">Direct from Farmers</h3>
                <p className="text-gray-600">
                  Buy directly from local farmers, ensuring freshness and supporting local agriculture.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#4caf50]/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#4caf50]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1c170d]">Fair Pricing</h3>
                <p className="text-gray-600">
                  Transparent pricing ensures farmers get fair compensation and consumers pay fair prices.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#4caf50]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#4caf50]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1c170d]">Community Driven</h3>
                <p className="text-gray-600">
                  Join a community of farmers and consumers committed to sustainable agriculture.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#4caf50]/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-[#4caf50]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1c170d]">Secure Trading</h3>
                <p className="text-gray-600">
                  Our platform ensures secure transactions and quality assurance for all products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#1c170d]">Ready to revolutionize agricultural trading?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers and consumers already using Agritrade to buy and sell agricultural products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="px-8 py-3 bg-[#4caf50] text-white font-medium rounded-lg hover:bg-[#3d8b40] transition-colors"
              >
                Create an Account
              </Link>
              <Link
                href="/auth"
                className="px-8 py-3 border border-[#4caf50] text-[#4caf50] font-medium rounded-lg hover:bg-[#4caf50]/5 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1c170d] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/agritrade-logo.png"
                  alt="Agritrade Logo"
                  width={40}
                  height={40}
                  className="object-contain bg-white rounded-full p-1"
                />
                <h2 className="text-2xl font-bold">Agritrade</h2>
              </div>
              <p className="max-w-xs text-gray-400">
                Connecting farmers and consumers directly for a more sustainable agricultural future.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Agritrade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

