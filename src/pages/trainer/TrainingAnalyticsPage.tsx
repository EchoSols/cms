"use client"

import type React from "react"
import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Target,
  Activity,
} from "lucide-react"

interface TrainingMetric {
  id: string
  name: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
}

interface CompletionRate {
  program: string
  completed: number
  inProgress: number
  notStarted: number
  total: number
}

const mockMetrics: TrainingMetric[] = [
  {
    id: "1",
    name: "Total Learners",
    value: 245,
    change: 12.5,
    trend: "up",
  },
  {
    id: "2",
    name: "Active Programs",
    value: 18,
    change: 5.2,
    trend: "up",
  },
  {
    id: "3",
    name: "Completion Rate",
    value: 78.3,
    change: -2.1,
    trend: "down",
  },
  {
    id: "4",
    name: "Avg. Training Hours",
    value: 24.7,
    change: 8.9,
    trend: "up",
  },
]

const mockCompletionRates: CompletionRate[] = [
  {
    program: "Project Management",
    completed: 45,
    inProgress: 23,
    notStarted: 12,
    total: 80,
  },
  {
    program: "Agile Development",
    completed: 38,
    inProgress: 31,
    notStarted: 11,
    total: 80,
  },
  {
    program: "Data Analysis",
    completed: 52,
    inProgress: 18,
    notStarted: 10,
    total: 80,
  },
]

const TrainingAnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
      case "stable":
        return <Activity className="w-4 h-4 text-gray-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Analytics Dashboard</h1>
          <p className="text-slate-300">Monitor training performance and learner progress</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <div key={metric.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  {metric.name.includes("Learners") && <Users className="w-5 h-5 text-white" />}
                  {metric.name.includes("Programs") && <BookOpen className="w-5 h-5 text-white" />}
                  {metric.name.includes("Rate") && <Award className="w-5 h-5 text-white" />}
                  {metric.name.includes("Hours") && <Clock className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-sm text-slate-300">{metric.name}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metric.trend)}
                <span className={`ml-1 text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rates Chart */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Program Completion Rates</h3>
          <div className="space-y-4">
            {mockCompletionRates.map((program) => (
              <div key={program.program} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-200">{program.program}</span>
                  <span className="text-slate-400">
                    {Math.round((program.completed / program.total) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(program.completed / program.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{program.completed} completed</span>
                  <span>{program.inProgress} in progress</span>
                  <span>{program.notStarted} not started</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg border border-green-800">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-300">High Performers</span>
              </div>
              <span className="text-lg font-bold text-green-400">67</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-900/30 rounded-lg border border-yellow-800">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-yellow-300">Average Performers</span>
              </div>
              <span className="text-lg font-bold text-yellow-400">89</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg border border-red-800">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-sm font-medium text-red-300">Needs Improvement</span>
              </div>
              <span className="text-lg font-bold text-red-400">23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Recent Training Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Project Management training completed by 15 learners</p>
                <p className="text-xs text-slate-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">New enrollment in Agile Development program</p>
                <p className="text-xs text-slate-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Data Analysis assessment scheduled</p>
                <p className="text-xs text-slate-400">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
            <Calendar className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-slate-200">Schedule Training</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
            <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-sm font-medium text-slate-200">Generate Report</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
            <Users className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-slate-200">Manage Learners</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrainingAnalyticsPage
