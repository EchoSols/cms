"use client"

import type React from "react"
import { useState } from "react"
import { TrendingUp, Target, CheckCircle, Star } from "lucide-react"

interface EffectivenessMetric {
  id: string
  programName: string
  satisfaction: number
  knowledgeRetention: number
  skillImprovement: number
  applicationRate: number
  overallScore: number
}

const mockMetrics: EffectivenessMetric[] = [
  {
    id: "1",
    programName: "Project Management Professional",
    satisfaction: 4.2,
    knowledgeRetention: 78,
    skillImprovement: 82,
    applicationRate: 75,
    overallScore: 79.8,
  },
  {
    id: "2",
    programName: "Agile Scrum Master",
    satisfaction: 4.5,
    knowledgeRetention: 85,
    skillImprovement: 88,
    applicationRate: 82,
    overallScore: 84.8,
  },
]

const EffectivenessAnalysisPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const overallStats = {
    avgSatisfaction:
      Math.round((mockMetrics.reduce((sum, m) => sum + m.satisfaction, 0) / mockMetrics.length) * 10) / 10,
    avgKnowledgeRetention: Math.round(
      mockMetrics.reduce((sum, m) => sum + m.knowledgeRetention, 0) / mockMetrics.length,
    ),
    avgSkillImprovement: Math.round(mockMetrics.reduce((sum, m) => sum + m.skillImprovement, 0) / mockMetrics.length),
    avgApplicationRate: Math.round(mockMetrics.reduce((sum, m) => sum + m.applicationRate, 0) / mockMetrics.length),
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Effectiveness Analysis</h1>
          <p className="text-slate-300">Analyze training program effectiveness and impact</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Overall Effectiveness Score */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Overall Training Effectiveness</h2>
            <p className="text-blue-100">Comprehensive analysis of all training programs</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">
              {Math.round(
                (overallStats.avgSatisfaction +
                  overallStats.avgKnowledgeRetention +
                  overallStats.avgSkillImprovement +
                  overallStats.avgApplicationRate) /
                  4,
              )}
              %
            </div>
            <p className="text-blue-100">Effectiveness Score</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Avg. Satisfaction</p>
              <p className="text-2xl font-bold text-white">{overallStats.avgSatisfaction}/5.0</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${(overallStats.avgSatisfaction / 5) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Knowledge Retention</p>
              <p className="text-2xl font-bold text-white">{overallStats.avgKnowledgeRetention}%</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${overallStats.avgKnowledgeRetention}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Skill Improvement</p>
              <p className="text-2xl font-bold text-white">{overallStats.avgSkillImprovement}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${overallStats.avgSkillImprovement}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300">Application Rate</p>
              <p className="text-2xl font-bold text-white">{overallStats.avgApplicationRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-500" />
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${overallStats.avgApplicationRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Program Effectiveness Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Program Effectiveness Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Knowledge Retention
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Skill Improvement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Overall Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {mockMetrics.map((metric) => (
                <tr key={metric.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{metric.programName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-white">{metric.satisfaction}/5.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${metric.knowledgeRetention}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{metric.knowledgeRetention}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${metric.skillImprovement}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{metric.skillImprovement}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getScoreColor(metric.overallScore) === "text-green-600" ? "bg-green-900 text-green-300" : getScoreColor(metric.overallScore) === "text-yellow-600" ? "bg-yellow-900 text-yellow-300" : "bg-red-900 text-red-300"}`}
                    >
                      {metric.overallScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EffectivenessAnalysisPage
