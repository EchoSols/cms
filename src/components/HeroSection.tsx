"use client"

import { Play } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => navigate('/signup')

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <p className="text-sm md:text-base text-slate-300/80 tracking-wide mb-4">Web-Based HR Management System</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Streamline Your HR Operations with AI‑Powered Solutions
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Automate recruitment, manage payroll, track performance, and ensure compliance with our comprehensive HR
              management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-white text-slate-900 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors duration-200 shadow"
                onClick={handleGetStarted}
              >
                Start Free Trial
              </button>
              <button className="px-6 md:px-8 py-3 rounded-full font-semibold border border-slate-700 text-white hover:bg-slate-800/60 transition-colors duration-200 flex items-center justify-center">
                <Play size={18} className="mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300 border border-slate-700">
              <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">HR Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Bar Chart */}
                  <div className="bg-gradient-to-tr from-indigo-600 to-blue-600 rounded p-2 flex items-end justify-between">
                    <div className="w-1 bg-white rounded-full h-8"></div>
                    <div className="w-1 bg-white rounded-full h-12"></div>
                    <div className="w-1 bg-white rounded-full h-6"></div>
                    <div className="w-1 bg-white rounded-full h-10"></div>
                  </div>

                  {/* Line Chart */}
                  <div className="bg-gradient-to-tr from-amber-600 to-orange-600 rounded p-2 relative">
                    <div className="absolute inset-2 border-l-2 border-b-2 border-white rounded-bl"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-6 h-1 bg-white rounded-full"></div>
                  </div>

                  {/* Donut Chart */}
                  <div className="bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded p-2 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white rounded-full border-r-transparent"></div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gradient-to-tr from-emerald-600 to-green-600 rounded p-2 text-white text-center">
                    <div className="text-sm font-bold">85%</div>
                    <div className="text-xs">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
