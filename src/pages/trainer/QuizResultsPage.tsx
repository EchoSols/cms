"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react"

interface QuizResult {
  id: string
  learnerName: string
  learnerEmail: string
  assessmentName: string
  assessmentType: string
  score: number
  totalPoints: number
  percentage: number
  status: "passed" | "failed" | "incomplete"
  timeTaken: number
  completedAt: string
  attempts: number
  maxAttempts: number
  questionsAnswered: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  skippedQuestions: number
}

const mockQuizResults: QuizResult[] = [
  {
    id: "RES001",
    learnerName: "Sarah Johnson",
    learnerEmail: "sarah.johnson@company.com",
    assessmentName: "React Fundamentals Quiz",
    assessmentType: "Technical Skills",
    score: 85,
    totalPoints: 100,
    percentage: 85,
    status: "passed",
    timeTaken: 45,
    completedAt: "2024-03-20T14:30:00Z",
    attempts: 1,
    maxAttempts: 3,
    questionsAnswered: 20,
    totalQuestions: 20,
    correctAnswers: 17,
    incorrectAnswers: 3,
    skippedQuestions: 0,
  },
  {
    id: "RES002",
    learnerName: "Michael Brown",
    learnerEmail: "michael.brown@company.com",
    assessmentName: "JavaScript Basics Assessment",
    assessmentType: "Technical Skills",
    score: 72,
    totalPoints: 100,
    percentage: 72,
    status: "passed",
    timeTaken: 38,
    completedAt: "2024-03-19T16:45:00Z",
    attempts: 2,
    maxAttempts: 3,
    questionsAnswered: 20,
    totalQuestions: 20,
    correctAnswers: 14,
    incorrectAnswers: 6,
    skippedQuestions: 0,
  },
  {
    id: "RES003",
    learnerName: "Emily Davis",
    learnerEmail: "emily.davis@company.com",
    assessmentName: "Agile Project Management",
    assessmentType: "Soft Skills",
    score: 95,
    totalPoints: 100,
    percentage: 95,
    status: "passed",
    timeTaken: 52,
    completedAt: "2024-03-18T11:20:00Z",
    attempts: 1,
    maxAttempts: 2,
    questionsAnswered: 25,
    totalQuestions: 25,
    correctAnswers: 24,
    incorrectAnswers: 1,
    skippedQuestions: 0,
  },
  {
    id: "RES004",
    learnerName: "James Wilson",
    learnerEmail: "james.wilson@company.com",
    assessmentName: "Cybersecurity Fundamentals",
    assessmentType: "Technical Skills",
    score: 68,
    totalPoints: 100,
    percentage: 68,
    status: "failed",
    timeTaken: 65,
    completedAt: "2024-03-17T09:15:00Z",
    attempts: 1,
    maxAttempts: 2,
    questionsAnswered: 20,
    totalQuestions: 20,
    correctAnswers: 13,
    incorrectAnswers: 7,
    skippedQuestions: 0,
  },
  {
    id: "RES005",
    learnerName: "Jennifer Lee",
    learnerEmail: "jennifer.lee@company.com",
    assessmentName: "Leadership Skills Assessment",
    assessmentType: "Soft Skills",
    score: 88,
    totalPoints: 100,
    percentage: 88,
    status: "passed",
    timeTaken: 48,
    completedAt: "2024-03-16T15:30:00Z",
    attempts: 1,
    maxAttempts: 2,
    questionsAnswered: 30,
    totalQuestions: 30,
    correctAnswers: 26,
    incorrectAnswers: 4,
    skippedQuestions: 0,
  },
]

const QuizResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [assessmentFilter, setAssessmentFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)

  const filteredResults = mockQuizResults.filter((result) => {
    const matchesSearch =
      result.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.learnerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.assessmentName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || result.status === statusFilter
    const matchesAssessment = assessmentFilter === "all" || result.assessmentName === assessmentFilter
    const matchesType = typeFilter === "all" || result.assessmentType === typeFilter

    return matchesSearch && matchesStatus && matchesAssessment && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "incomplete":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return CheckCircle
      case "failed":
        return XCircle
      case "incomplete":
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const quickStats = [
    {
      label: "Total Attempts",
      value: mockQuizResults.length,
      icon: Users,
      color: "text-blue-600",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Pass Rate",
      value: `${Math.round((mockQuizResults.filter((r) => r.status === "passed").length / mockQuizResults.length) * 100)}%`,
      icon: CheckCircle,
      color: "text-green-600",
      change: "+5%",
      trend: "up",
    },
    {
      label: "Average Score",
      value: `${Math.round(mockQuizResults.reduce((acc, r) => acc + r.percentage, 0) / mockQuizResults.length)}%`,
      icon: BarChart3,
      color: "text-purple-600",
      change: "+3%",
      trend: "up",
    },
    {
      label: "Avg Time",
      value: `${Math.round(mockQuizResults.reduce((acc, r) => acc + r.timeTaken, 0) / mockQuizResults.length)}m`,
      icon: Clock,
      color: "text-orange-600",
      change: "-2%",
      trend: "down",
    },
  ]

  const uniqueAssessments = [...new Set(mockQuizResults.map((r) => r.assessmentName))]
  const uniqueTypes = [...new Set(mockQuizResults.map((r) => r.assessmentType))]

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quiz Results</h1>
          <p className="text-slate-300">View and analyze assessment performance results</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="flex items-center gap-1">
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-slate-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search learners, assessments, or results..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                showFilters
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assessment</label>
                <select
                  value={assessmentFilter}
                  onChange={(e) => setAssessmentFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Assessments</option>
                  {uniqueAssessments.map((assessment) => (
                    <option key={assessment} value={assessment}>
                      {assessment}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {filteredResults.length} of {mockQuizResults.length} results
        </p>
      </div>

      {/* Results Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Learner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredResults.map((result) => {
                const StatusIcon = getStatusIcon(result.status)
                return (
                  <tr key={result.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{result.learnerName}</div>
                        <div className="text-sm text-slate-400">{result.learnerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{result.assessmentName}</div>
                        <div className="text-sm text-slate-400">{result.assessmentType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-600 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getPerformanceColor(result.percentage)}`}
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(result.percentage)}`}>
                          {result.score}/{result.totalPoints} ({result.percentage}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-4 h-4 mr-2" />
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(result.status)}`}
                        >
                          {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{result.timeTaken} min</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {result.attempts}/{result.maxAttempts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedResult(result)
                          setShowResultModal(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Detail Modal */}
      {showResultModal && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Result Details</h2>
                <button onClick={() => setShowResultModal(false)} className="text-slate-400 hover:text-slate-300">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-white mb-3">Learner Information</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-slate-400">Name:</span>
                        <p className="text-white">{selectedResult.learnerName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Email:</span>
                        <p className="text-white">{selectedResult.learnerEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-3">Assessment Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-slate-400">Assessment:</span>
                        <p className="text-white">{selectedResult.assessmentName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Type:</span>
                        <p className="text-white">{selectedResult.assessmentType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-3">Performance Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {selectedResult.score}/{selectedResult.totalPoints}
                      </p>
                      <p className="text-sm text-slate-400">Score</p>
                    </div>
                    <div>
                      <p className={`text-2xl font-bold ${getPerformanceColor(selectedResult.percentage)}`}>
                        {selectedResult.percentage}%
                      </p>
                      <p className="text-sm text-slate-400">Percentage</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{selectedResult.timeTaken}m</p>
                      <p className="text-sm text-slate-400">Time Taken</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {selectedResult.attempts}/{selectedResult.maxAttempts}
                      </p>
                      <p className="text-sm text-slate-400">Attempts</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-white mb-3">Question Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Questions Answered:</span>
                        <span className="text-white">
                          {selectedResult.questionsAnswered}/{selectedResult.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Correct Answers:</span>
                        <span className="text-green-400">{selectedResult.correctAnswers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Incorrect Answers:</span>
                        <span className="text-red-400">{selectedResult.incorrectAnswers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Skipped Questions:</span>
                        <span className="text-yellow-400">{selectedResult.skippedQuestions}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-3">Completion Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-slate-400">Completed At:</span>
                        <p className="text-white">{new Date(selectedResult.completedAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Status:</span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getStatusColor(selectedResult.status)}`}
                        >
                          {selectedResult.status.charAt(0).toUpperCase() + selectedResult.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Detailed Analytics
                </button>
                <button className="flex-1 bg-slate-700 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizResultsPage
