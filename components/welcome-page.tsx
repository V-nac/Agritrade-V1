"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function WelcomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      title: "Agriculture trading made easy.",
      description: "Buy and sell grains, oilseeds, livestock, dairy, and other commodities.",
    },
    {
      title: "Empowering Farmers In Cambodia",
      description: "Cut out the middleman and get better prices for your agricultural products.",
    },
    {
      title: "Direct Farm to Consumer",
      description: "Fresh produce delivered directly from farms to your doorstep.",
    },
    {
      title: "Join Our Growing Community",
      description: "Connect with farmers and buyers across the country.",
    },
  ]

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleDotClick = (index: number) => {
    setActiveSlide(index)
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Add touch swipe functionality
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > 50) {
        // Swipe left
        handleNext()
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        handlePrev()
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with logo */}
      <header className="flex items-center p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/agritrade-logo.png" alt="Agritrade Logo" width={40} height={40} className="object-contain" />
          <h1 className="text-4xl font-medium text-stone-700">Agritrade</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Hero image carousel */}
        <div className="relative w-full h-80">
          <div
            className="w-full h-full flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            <div className="w-full h-full flex-shrink-0 relative">
              <Image
                src="/images/cambodia-rice-farmer.webp"
                alt="Farmer carrying rice seedlings with child in Cambodia"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full h-full flex-shrink-0 relative">
              <Image
                src="/images/farmer-with-buffalo.jpeg"
                alt="Farmer with water buffalo in Cambodia"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-full flex-shrink-0 relative">
              <Image
                src="/images/rice-fields-aerial.webp"
                alt="Aerial view of rice fields in Cambodia"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-full flex-shrink-0 relative">
              <Image
                src="/images/rice-planting.jpeg"
                alt="Farmers planting rice in Cambodia"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center px-6 py-8 text-center relative">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <button onClick={handlePrev} className="p-1 rounded-full bg-white/80 shadow-md" aria-label="Previous slide">
              <ChevronLeft className="w-5 h-5 text-stone-700" />
            </button>
          </div>

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <button onClick={handleNext} className="p-1 rounded-full bg-white/80 shadow-md" aria-label="Next slide">
              <ChevronRight className="w-5 h-5 text-stone-700" />
            </button>
          </div>

          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <h2 className="text-4xl font-bold text-stone-900 mb-4">{slide.title}</h2>
                  <p className="text-lg text-stone-700 mb-12">{slide.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex gap-2 mt-auto mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${activeSlide === index ? "bg-[#22C55E]" : "bg-gray-200"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex w-full gap-4 mt-4">
            <Link
              href="/auth"
              className="flex-1 py-4 text-center font-medium text-stone-900 bg-white border border-gray-200 rounded-full"
            >
              Log in
            </Link>
            <Link href="/auth" className="flex-1 py-4 text-center font-medium text-white bg-[#22C55E] rounded-full">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

