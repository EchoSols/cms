"use client"

import type React from "react"
import { useState } from "react"
import { TrendingUp, DollarSign, Users, Calculator } from "lucide-react"

interface ROIMetric {
  id: string
  programName: string
  totalCost: number
  totalBenefit: number
  roi: number
  paybackPeriod: number
  participants: number
  avgSalaryIncrease: number
}

const mockROIMetrics: ROIMetric[] = [
  {
    id: "1",
    programName: "Project Management Professional",
    totalCost: 25000,
    totalBenefit: 45000,
    roi: 80,
    paybackPeriod: 8,
    participants: 45,
    avgSalaryIncrease: 12000,
  },
  {
    id: "2",
    programName: "Agile Scrum Master",
    totalCost: 18000,
    totalBenefit: 35000,
    roi: 94,
    paybackPeriod: 6,
    participants: 32,
    avgSalaryIncrease: 15000,
  },
]

const ROIAnalysisPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("year")

  const getROIColor = (roi: number) => {
    if (roi >= 100) return "text-green-600"
    if (roi >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const overallStats = {
    totalInvestment: mockROIMetrics.reduce((sum, m) => sum + m.totalCost, 0),
    totalReturn: mockROIMetrics.reduce((sum, m) => sum + m.totalBenefit, 0),
    avgROI: Math.round(mockROIMetrics.reduce((sum, m) => sum + m.roi, 0) / mockROIMetrics.length),
    totalParticipants: mockROIMetrics.reduce((sum, m) => sum + m.participants, 0),
  }

  const netBenefit = overallStats.totalReturn - overallStats.totalInvestment

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">ROI Analysis</h1>
          <p className="text-slate-300">Training return on investment and cost-benefit analysis</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        >
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
          <option value="two-years">Last 2 Years</option>
        </select>
      </div>

      {/* Overall ROI Summary */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Investment</h2>
            <div className="text-3xl font-bold">${overallStats.totalInvestment.toLocaleString()}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Return</h2>
            <div className="text-3xl font-bold">${overallStats.totalReturn.toLocaleString()}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Net Benefit</h2>
            <div className="text-3xl font-bold">${netBenefit.toLocaleString()}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Average ROI</h2>
            <div className="text-3xl font-bold">{overallStats.avgROI}%</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Total Investment</p>
              <p className="text-2xl font-bold text-white">${overallStats.totalInvestment.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Total Return</p>
              <p className="text-2xl font-bold text-green-600">${overallStats.totalReturn.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Net Benefit</p>
              <p className="text-2xl font-bold text-blue-600">${netBenefit.toLocaleString()}</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Total Participants</p>
              <p className="text-2xl font-bold text-white">{overallStats.totalParticipants}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* ROI by Program */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">ROI by Training Program</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Payback Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Avg. Salary Increase
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {mockROIMetrics.map((metric) => (
                <tr key={metric.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{metric.programName}</div>
                      <div className="text-sm text-slate-400">{metric.participants} participants</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">${metric.totalCost.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-400 font-medium">${metric.totalBenefit.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getROIColor(metric.roi) === "text-green-600" ? "bg-green-900 text-green-300" : getROIColor(metric.roi) === "text-yellow-600" ? "bg-yellow-900 text-yellow-300" : "bg-red-900 text-red-300"}`}
                    >
                      {metric.roi}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{metric.paybackPeriod} months</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-400 font-medium">
                      ${metric.avgSalaryIncrease.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">ROI Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">High ROI Programs</p>
                <p className="text-sm text-slate-300">Agile Scrum Master shows highest ROI at 94%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">Quick Payback</p>
                <p className="text-sm text-slate-300">Average payback period is 7 months</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">Salary Impact</p>
                <p className="text-sm text-slate-300">Average salary increase of $13,500 per participant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">Scale High-ROI Programs</p>
                <p className="text-sm text-slate-300">Expand Agile Scrum Master program based on high ROI</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">Optimize Costs</p>
                <p className="text-sm text-slate-300">Review Project Management program costs to improve ROI</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-white">Track Long-term Benefits</p>
                <p className="text-sm text-slate-300">Monitor salary increases and career progression over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ROIAnalysisPage
