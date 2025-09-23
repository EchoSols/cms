"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ContactModal from "./ContactModal"
import PricingModal from "./PricingModal"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const navigate = useNavigate()

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing", onClick: () => setIsPricingModalOpen(true) },
    { name: "Contact", href: "#contact", onClick: () => setIsContactModalOpen(true) },
  ]

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-white">HR Pro</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick || (() => {})}
                  className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate('/login')} className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                Sign In
              </button>
              <button onClick={() => navigate('/signup')} className="bg-white text-slate-900 px-5 py-2 rounded-full font-semibold hover:bg-slate-100 transition-colors duration-200 shadow">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.onClick) item.onClick()
                      setIsMenuOpen(false)
                    }}
                    className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-slate-800">
                  <button onClick={() => { navigate('/login'); setIsMenuOpen(false) }} className="block text-slate-300 hover:text-white mb-3 font-medium">Sign In</button>
                  <button onClick={() => { navigate('/signup'); setIsMenuOpen(false) }} className="bg-white text-slate-900 px-6 py-2 rounded-full font-semibold hover:bg-slate-100 transition-colors duration-200 w-full shadow">
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </>
  )
}

export default Header
