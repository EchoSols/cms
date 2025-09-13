"use client"

import type React from "react"
import { useState } from "react"
import { Search, Download, Eye, Users, CheckCircle, Clock, XCircle, TrendingUp, FileText } from "lucide-react"

interface CompletionReport {
  id: string
  programName: string
  totalEnrolled: number
  completed: number
  inProgress: number
  droppedOut: number
  completionRate: number
  avgDuration: number
  startDate: string
  endDate: string
  status: "Active" | "Completed" | "Suspended"
}

const mockReports: CompletionReport[] = [
  {
    id: "1",
    programName: "Project Management Professional",
    totalEnrolled: 45,
    completed: 38,
    inProgress: 5,
    droppedOut: 2,
    completionRate: 84.4,
    avgDuration: 12,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    status: "Active",
  },
  {
    id: "2",
    programName: "Agile Scrum Master",
    totalEnrolled: 32,
    completed: 28,
    inProgress: 3,
    droppedOut: 1,
    completionRate: 87.5,
    avgDuration: 8,
    startDate: "2024-02-01",
    endDate: "2024-10-01",
    status: "Active",
  },
  {
    id: "3",
    programName: "Data Analysis Fundamentals",
    totalEnrolled: 28,
    completed: 25,
    inProgress: 2,
    droppedOut: 1,
    completionRate: 89.3,
    avgDuration: 6,
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    status: "Completed",
  },
]

const CompletionReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedReport, setSelectedReport] = useState<CompletionReport | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.programName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Suspended":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600"
    if (rate >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const overallStats = {
    totalPrograms: mockReports.length,
    totalEnrolled: mockReports.reduce((sum, r) => sum + r.totalEnrolled, 0),
    totalCompleted: mockReports.reduce((sum, r) => sum + r.completed, 0),
    avgCompletionRate: Math.round(mockReports.reduce((sum, r) => sum + r.completionRate, 0) / mockReports.length),
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Completion Reports</h1>
          <p className="text-slate-300">Track training program completion rates and performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Programs</p>
              <p className="text-2xl font-bold text-white">{overallStats.totalPrograms}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Enrolled</p>
              <p className="text-2xl font-bold text-white">{overallStats.totalEnrolled}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Completed</p>
              <p className="text-2xl font-bold text-white">{overallStats.totalCompleted}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Avg Completion Rate</p>
              <p className="text-2xl font-bold text-green-400">{overallStats.avgCompletionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{report.programName}</div>
                      <div className="text-sm text-slate-400">
                        {report.startDate} - {report.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-white">Total: {report.totalEnrolled}</div>
                      <div className="text-sm text-slate-400">Completed: {report.completed}</div>
                      <div className="text-sm text-slate-400">In Progress: {report.inProgress}</div>
                      <div className="text-sm text-slate-400">Dropped: {report.droppedOut}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-600 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getCompletionColor(report.completionRate) === "text-green-600" ? "bg-green-500" : getCompletionColor(report.completionRate) === "text-yellow-600" ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${report.completionRate}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getCompletionColor(report.completionRate)}`}>
                        {report.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-white">{report.avgDuration} weeks</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReport(report)
                          setShowDetails(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetails && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Completion Report Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-200">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Program Name</label>
                  <p className="mt-1 text-sm text-white">{selectedReport.programName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedReport.status)}`}
                  >
                    {selectedReport.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Start Date</label>
                  <p className="mt-1 text-sm text-white">{selectedReport.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">End Date</label>
                  <p className="mt-1 text-sm text-white">{selectedReport.endDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Total Enrolled</label>
                  <p className="mt-1 text-2xl font-bold text-blue-400">{selectedReport.totalEnrolled}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Completion Rate</label>
                  <p className={`mt-1 text-2xl font-bold ${getCompletionColor(selectedReport.completionRate)}`}>
                    {selectedReport.completionRate}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm font-medium text-green-300">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-green-400">{selectedReport.completed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-800">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-sm font-medium text-yellow-300">In Progress</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-400">{selectedReport.inProgress}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-800">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-sm font-medium text-red-300">Dropped Out</span>
                  </div>
                  <span className="text-lg font-bold text-red-400">{selectedReport.droppedOut}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Average Duration</label>
                <p className="mt-1 text-sm text-white">{selectedReport.avgDuration} weeks</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompletionReportsPage
