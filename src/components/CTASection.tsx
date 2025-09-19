"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PricingModal from "./PricingModal"

const CTASection = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <section id="pricing" className="bg-slate-800 min-h-screen flex items-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your HR Operations?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of companies using HR Pro to streamline their workforce management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow"
              >
                Start 15-Day Free Trial
              </button>
              <button className="border border-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  )
}

export default CTASection
