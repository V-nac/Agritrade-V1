"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Phone, Mail, MessageSquare, ChevronDown, ChevronUp, ExternalLink, Send } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export default function HelpSupportPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const faqItems: FAQItem[] = [
    {
      question: "How do I place a buy order?",
      answer:
        "To place a buy order, navigate to the market page of the commodity you want to purchase. Click on the 'Buy' button, enter the quantity and price (for limit orders), then confirm your order. You can view your pending orders in the 'My Orders' section.",
    },
    {
      question: "What's the difference between market and limit orders?",
      answer:
        "A market order is executed immediately at the current market price. A limit order allows you to set a specific price at which you want to buy or sell. The order will only be executed when the market reaches your specified price.",
    },
    {
      question: "How do I add funds to my account?",
      answer:
        "You can add funds to your account by going to the Wallet section and clicking on 'Add Funds'. We support various payment methods including bank transfers, credit/debit cards, and mobile payment options.",
    },
    {
      question: "What fees does Agritrade charge?",
      answer:
        "Agritrade charges a small transaction fee of 1% on all trades. There are no hidden fees or monthly subscription charges. Withdrawal fees vary depending on your payment method and location.",
    },
    {
      question: "How do I verify my account?",
      answer:
        "To verify your account, go to your Profile page and click on 'Verify Account'. You'll need to provide a valid ID document (passport, driver's license, or national ID) and proof of address. Verification typically takes 1-2 business days.",
    },
    {
      question: "Can I cancel a pending order?",
      answer:
        "Yes, you can cancel any pending limit order that hasn't been filled yet. Go to 'My Orders', find the pending order you want to cancel, and click the 'Cancel' button.",
    },
    {
      question: "How do I withdraw my funds?",
      answer:
        "To withdraw funds, go to the Wallet section and click on 'Withdraw'. Select your preferred withdrawal method, enter the amount, and confirm the transaction. Processing times vary depending on the withdrawal method.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false)
        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Help & Support</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "faq" ? "text-[#22C55E] border-b-2 border-[#22C55E]" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "contact" ? "text-[#22C55E] border-b-2 border-[#22C55E]" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Us
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        {activeTab === "faq" ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium">{item.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="p-4 bg-white border-t">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-4">
                If you couldn't find the answer to your question, please contact our support team.
              </p>
              <button
                onClick={() => setActiveTab("contact")}
                className="w-full py-3 bg-[#22C55E] text-white font-medium rounded-lg hover:bg-[#15803D] transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Contact Support</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a href="tel:+1234567890" className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                  <Phone className="h-6 w-6 text-[#22C55E] mr-3" />
                  <div>
                    <div className="font-medium">Call Us</div>
                    <div className="text-sm text-gray-600">+1 (234) 567-8900</div>
                  </div>
                </a>

                <a
                  href="mailto:support@agritrade.com"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <Mail className="h-6 w-6 text-[#22C55E] mr-3" />
                  <div>
                    <div className="font-medium">Email Us</div>
                    <div className="text-sm text-gray-600">support@agritrade.com</div>
                  </div>
                </a>

                <a href="#" className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                  <MessageSquare className="h-6 w-6 text-[#22C55E] mr-3" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 24/7</div>
                  </div>
                </a>

                <a href="#" className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                  <ExternalLink className="h-6 w-6 text-[#22C55E] mr-3" />
                  <div>
                    <div className="font-medium">Knowledge Base</div>
                    <div className="text-sm text-gray-600">Browse articles</div>
                  </div>
                </a>
              </div>

              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#22C55E] text-white font-medium rounded-lg hover:bg-[#15803D] transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

