"use client"

import { useState } from "react"
import { Heart, Shield, DollarSign, Calendar, FileText, CheckCircle, Edit } from "lucide-react"

const BenefitsPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [showEnrollment, setShowEnrollment] = useState(false)

  // Mock benefits data
  const currentBenefits = {
    health: {
      plan: "Premium Health Plan",
      provider: "Blue Cross Blue Shield",
      monthlyPremium: 85.0,
      deductible: 1000,
      coverage: "Employee + Spouse",
      status: "active",
      effectiveDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    dental: {
      plan: "Comprehensive Dental",
      provider: "Delta Dental",
      monthlyPremium: 25.0,
      coverage: "Employee Only",
      status: "active",
      effectiveDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    vision: {
      plan: "Vision Plus",
      provider: "VSP",
      monthlyPremium: 12.0,
      coverage: "Employee Only",
      status: "active",
      effectiveDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    life: {
      plan: "Basic Life Insurance",
      provider: "MetLife",
      coverage: "$50,000",
      monthlyPremium: 0.0,
      status: "active",
      beneficiary: "Jane Doe",
    },
    retirement: {
      plan: "401(k) Plan",
      provider: "Fidelity",
      employeeContribution: 5.0,
      employerMatch: 3.0,
      currentBalance: 45250.0,
      vestingStatus: "100% vested",
    },
  }

  const availablePlans = {
    health: [
      {
        name: "Basic Health Plan",
        provider: "Blue Cross Blue Shield",
        monthlyPremium: {
          employee: 45,
          employeeSpouse: 120,
          employeeFamily: 185,
        },
        deductible: 2500,
        features: ["Basic coverage", "Emergency care", "Primary care visits"],
      },
      {
        name: "Standard Health Plan",
        provider: "Blue Cross Blue Shield",
        monthlyPremium: {
          employee: 65,
          employeeSpouse: 145,
          employeeFamily: 225,
        },
        deductible: 1500,
        features: ["Standard coverage", "Specialist visits", "Prescription drugs", "Mental health"],
      },
      {
        name: "Premium Health Plan",
        provider: "Blue Cross Blue Shield",
        monthlyPremium: {
          employee: 85,
          employeeSpouse: 175,
          employeeFamily: 275,
        },
        deductible: 1000,
        features: ["Comprehensive coverage", "No referrals needed", "Preventive care", "Dental included"],
      },
    ],
  }

  const upcomingEvents = [
    {
      type: "Open Enrollment",
      date: "2024-11-01",
      endDate: "2024-11-30",
      description: "Annual benefits enrollment period",
      status: "upcoming",
    },
    {
      type: "Health Savings Account",
      date: "2024-12-31",
      description: "HSA contribution deadline",
      status: "deadline",
    },
  ]

  const benefitsUsage = [
    {
      type: "Health",
      claims: 8,
      amountUsed: 2450.0,
      lastClaim: "2024-01-10",
      provider: "General Hospital",
    },
    {
      type: "Dental",
      claims: 2,
      amountUsed: 340.0,
      lastClaim: "2023-12-15",
      provider: "Smile Dental",
    },
    {
      type: "Vision",
      claims: 1,
      amountUsed: 125.0,
      lastClaim: "2023-10-05",
      provider: "Vision Center",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "health", label: "Health & Wellness", icon: Heart },
    { id: "retirement", label: "Retirement", icon: DollarSign },
    { id: "usage", label: "Claims & Usage", icon: Shield },
  ]

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white mb-6">
          <h1 className="text-2xl font-bold mb-2">Benefits Enrollment</h1>
          <p className="text-green-100">Manage your employee benefits and coverage</p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowEnrollment(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Enroll/Change Benefits
          </button>
        </div>

        {/* Upcoming Events Alert */}
        {upcomingEvents.some((event) => event.status === "upcoming") && (
          <div className="bg-blue-900/50 border border-blue-700 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-2">Upcoming Benefits Events</h3>
                <div className="space-y-1">
                  {upcomingEvents
                    .filter((event) => event.status === "upcoming")
                    .map((event, index) => (
                      <div key={index} className="text-sm text-blue-200">
                        <span className="font-medium">{event.type}</span>: {event.description}(
                        {new Date(event.date).toLocaleDateString()} -{" "}
                        {new Date(event.endDate || event.date).toLocaleDateString()})
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-slate-700 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-400"
                    : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Current Benefits Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/50 rounded-lg">
                    <Heart className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Health Insurance</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(currentBenefits.health.status)}`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {currentBenefits.health.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-slate-400">Plan:</span>
                    <span className="font-medium ml-2 text-white">{currentBenefits.health.plan}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Coverage:</span>
                    <span className="ml-2 text-slate-300">{currentBenefits.health.coverage}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Monthly Premium:</span>
                    <span className="ml-2 font-medium text-white">${currentBenefits.health.monthlyPremium}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">401(k) Retirement</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor("active")}`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      active
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-slate-400">Your Contribution:</span>
                    <span className="font-medium ml-2 text-white">
                      {currentBenefits.retirement.employeeContribution}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Company Match:</span>
                    <span className="ml-2 text-slate-300">{currentBenefits.retirement.employerMatch}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Balance:</span>
                    <span className="ml-2 font-medium text-white">
                      ${currentBenefits.retirement.currentBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Life Insurance</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(currentBenefits.life.status)}`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {currentBenefits.life.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-slate-400">Coverage:</span>
                    <span className="font-medium ml-2 text-white">{currentBenefits.life.coverage}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Beneficiary:</span>
                    <span className="ml-2 text-slate-300">{currentBenefits.life.beneficiary}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Monthly Premium:</span>
                    <span className="ml-2 font-medium text-white">
                      {currentBenefits.life.monthlyPremium === 0
                        ? "Company Paid"
                        : `$${currentBenefits.life.monthlyPremium}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Cost Summary */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Benefits Cost</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Health Insurance</span>
                    <span className="font-medium text-white">${currentBenefits.health.monthlyPremium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dental Insurance</span>
                    <span className="font-medium text-white">${currentBenefits.dental.monthlyPremium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vision Insurance</span>
                    <span className="font-medium text-white">${currentBenefits.vision.monthlyPremium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Life Insurance</span>
                    <span className="font-medium text-white">
                      {currentBenefits.life.monthlyPremium === 0
                        ? "Company Paid"
                        : `$${currentBenefits.life.monthlyPremium}`}
                    </span>
                  </div>
                  <div className="border-t border-slate-600 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-white">Total Monthly Cost</span>
                      <span className="text-primary-400">
                        $
                        {(
                          currentBenefits.health.monthlyPremium +
                          currentBenefits.dental.monthlyPremium +
                          currentBenefits.vision.monthlyPremium +
                          currentBenefits.life.monthlyPremium
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Annual Savings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Your Annual Cost:</span>
                      <span className="text-slate-300">
                        $
                        {(
                          (currentBenefits.health.monthlyPremium +
                            currentBenefits.dental.monthlyPremium +
                            currentBenefits.vision.monthlyPremium) *
                          12
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Company Contribution:</span>
                      <span className="text-green-400">$8,400</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2">
                      <div className="flex justify-between font-medium">
                        <span className="text-white">Total Annual Value:</span>
                        <span className="text-white">
                          $
                          {(
                            (currentBenefits.health.monthlyPremium +
                              currentBenefits.dental.monthlyPremium +
                              currentBenefits.vision.monthlyPremium) *
                              12 +
                            8400
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "usage" && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Benefits Usage Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefitsUsage.map((usage, index) => (
                  <div key={index} className="p-4 border border-slate-600 rounded-lg">
                    <h4 className="font-medium text-white mb-2">{usage.type} Insurance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Claims This Year:</span>
                        <span className="font-medium text-white">{usage.claims}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount Used:</span>
                        <span className="font-medium text-white">${usage.amountUsed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Claim:</span>
                        <span className="text-slate-300">{new Date(usage.lastClaim).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Provider:</span>
                        <span className="text-slate-300">{usage.provider}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BenefitsPage
