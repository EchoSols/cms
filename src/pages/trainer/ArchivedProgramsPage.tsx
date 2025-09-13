"use client"

import { useState } from "react"
import {
  Archive,
  RotateCcw,
  Eye,
  Trash2,
  Search,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface ArchivedProgram {
  id: string
  name: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  archivedDate: string
  archivedBy: string
  reason: string
  originalEnrollment: number
  completionRate: number
  createdAt: string
  lastActiveDate: string
}

const mockArchivedPrograms: ArchivedProgram[] = [
  {
    id: "1",
    name: "Legacy Project Management Basics",
    description: "Basic project management course replaced by updated curriculum",
    category: "Project Management",
    level: "Beginner",
    duration: "4 weeks",
    archivedDate: "2024-11-15",
    archivedBy: "Dr. Sarah Johnson",
    reason: "Curriculum updated - replaced by new version",
    originalEnrollment: 234,
    completionRate: 67,
    createdAt: "2023-01-10",
    lastActiveDate: "2024-11-10",
  },
  {
    id: "2",
    name: "Introduction to Waterfall Methodology",
    description: "Traditional waterfall project management approach",
    category: "Project Management",
    level: "Intermediate",
    duration: "6 weeks",
    archivedDate: "2024-10-20",
    archivedBy: "Prof. Michael Chen",
    reason: "Low enrollment - focus shifted to Agile",
    originalEnrollment: 45,
    completionRate: 78,
    createdAt: "2023-03-15",
    lastActiveDate: "2024-10-15",
  },
  {
    id: "3",
    name: "Basic Excel for Business",
    description: "Fundamental Excel skills for business professionals",
    category: "Business Skills",
    level: "Beginner",
    duration: "3 weeks",
    archivedDate: "2024-09-30",
    archivedBy: "Dr. Lisa Wang",
    reason: "Technology outdated - replaced by modern tools",
    originalEnrollment: 189,
    completionRate: 85,
    createdAt: "2022-08-20",
    lastActiveDate: "2024-09-25",
  },
  {
    id: "4",
    name: "Leadership in Remote Teams (COVID-19)",
    description: "Special program for managing remote teams during pandemic",
    category: "Leadership",
    level: "Advanced",
    duration: "8 weeks",
    archivedDate: "2024-08-15",
    archivedBy: "Prof. Robert Smith",
    reason: "Program completed - specific to pandemic period",
    originalEnrollment: 156,
    completionRate: 92,
    createdAt: "2020-04-01",
    lastActiveDate: "2024-08-10",
  },
  {
    id: "5",
    name: "Flash Development Fundamentals",
    description: "Adobe Flash development for web applications",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 weeks",
    archivedDate: "2024-07-01",
    archivedBy: "Dr. Amanda Lee",
    reason: "Technology discontinued by vendor",
    originalEnrollment: 78,
    completionRate: 56,
    createdAt: "2019-02-10",
    lastActiveDate: "2024-06-25",
  },
]

const ArchivedProgramsPage = () => {
  const [programs, setPrograms] = useState<ArchivedProgram[]>(mockArchivedPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [levelFilter, setLevelFilter] = useState("All")
  const [reasonFilter, setReasonFilter] = useState("All")
  const [selectedProgram, setSelectedProgram] = useState<ArchivedProgram | null>(null)

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || program.category === categoryFilter
    const matchesLevel = levelFilter === "All" || program.level === levelFilter
    const matchesReason = reasonFilter === "All" || program.reason.toLowerCase().includes(reasonFilter.toLowerCase())
    return matchesSearch && matchesCategory && matchesLevel && matchesReason
  })

  const stats = {
    total: programs.length,
    totalEnrollment: programs.reduce((sum, p) => sum + p.originalEnrollment, 0),
    avgCompletion: Math.round(programs.reduce((sum, p) => sum + p.completionRate, 0) / programs.length),
    recentlyArchived: programs.filter((p) => {
      const archivedDate = new Date(p.archivedDate)
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      return archivedDate > threeMonthsAgo
    }).length,
  }

  const handleRestoreProgram = (programId: string) => {
    if (window.confirm("Are you sure you want to restore this program?")) {
      // In a real app, this would make an API call to restore the program
      console.log("Restoring program:", programId)
    }
  }

  const handlePermanentDelete = (programId: string) => {
    if (window.confirm("Are you sure you want to permanently delete this program? This action cannot be undone.")) {
      setPrograms((prev) => prev.filter((p) => p.id !== programId))
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-900 text-green-300"
      case "Intermediate":
        return "bg-yellow-900 text-yellow-300"
      case "Advanced":
        return "bg-red-900 text-red-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getReasonIcon = (reason: string) => {
    if (reason.toLowerCase().includes("updated") || reason.toLowerCase().includes("replaced")) {
      return <RotateCcw className="w-4 h-4 text-blue-400" />
    } else if (reason.toLowerCase().includes("enrollment") || reason.toLowerCase().includes("demand")) {
      return <Users className="w-4 h-4 text-yellow-400" />
    } else if (reason.toLowerCase().includes("technology") || reason.toLowerCase().includes("outdated")) {
      return <AlertTriangle className="w-4 h-4 text-orange-400" />
    } else if (reason.toLowerCase().includes("completed")) {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    }
    return <Archive className="w-4 h-4 text-slate-400" />
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Archived Programs</h1>
        <p className="text-slate-300">View and manage archived training programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-slate-700 rounded-lg">
              <Archive className="w-6 h-6 text-slate-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Archived</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Enrollment</p>
              <p className="text-2xl font-bold text-white">{stats.totalEnrollment}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Avg Completion</p>
              <p className="text-2xl font-bold text-white">{stats.avgCompletion}%</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Recently Archived</p>
              <p className="text-2xl font-bold text-white">{stats.recentlyArchived}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search archived programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Categories</option>
              <option value="Project Management">Project Management</option>
              <option value="Business Skills">Business Skills</option>
              <option value="Leadership">Leadership</option>
              <option value="Web Development">Web Development</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Reasons</option>
              <option value="updated">Curriculum Updated</option>
              <option value="enrollment">Low Enrollment</option>
              <option value="technology">Technology Issues</option>
              <option value="completed">Program Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Category & Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Archive Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{program.name}</div>
                      <div className="text-sm text-slate-300 mt-1">{program.description}</div>
                      <div className="text-xs text-slate-400 mt-2">
                        Duration: {program.duration} • Created: {program.createdAt}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-900 text-blue-300 rounded">
                        {program.category}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(program.level)}`}
                      >
                        {program.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-slate-300">
                        {getReasonIcon(program.reason)}
                        <span className="ml-2">{program.reason}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        <div>Archived: {program.archivedDate}</div>
                        <div>By: {program.archivedBy}</div>
                        <div>Last Active: {program.lastActiveDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-300">
                        <div>Enrollment: {program.originalEnrollment}</div>
                        <div>Completion: {program.completionRate}%</div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${program.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProgram(program)}
                        className="text-blue-400 hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRestoreProgram(program.id)}
                        className="text-green-400 hover:text-green-300"
                        title="Restore Program"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(program.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Permanently Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <Archive className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No archived programs found</h3>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Program Details</h3>
              <button onClick={() => setSelectedProgram(null)} className="text-slate-400 hover:text-slate-300">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{selectedProgram.name}</h4>
                <p className="text-slate-300">{selectedProgram.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-white mb-3">Program Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="text-white">{selectedProgram.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Level:</span>
                      <span className="text-white">{selectedProgram.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-white">{selectedProgram.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Created:</span>
                      <span className="text-white">{selectedProgram.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-3">Archive Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Archived Date:</span>
                      <span className="text-white">{selectedProgram.archivedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Archived By:</span>
                      <span className="text-white">{selectedProgram.archivedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Active:</span>
                      <span className="text-white">{selectedProgram.lastActiveDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-white mb-3">Archive Reason</h5>
                <div className="flex items-center p-3 bg-slate-700 rounded-lg">
                  {getReasonIcon(selectedProgram.reason)}
                  <span className="ml-3 text-slate-300">{selectedProgram.reason}</span>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-white mb-3">Performance Metrics</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedProgram.originalEnrollment}</div>
                    <div className="text-sm text-slate-400">Total Enrollment</div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedProgram.completionRate}%</div>
                    <div className="text-sm text-slate-400">Completion Rate</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleRestoreProgram(selectedProgram.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Restore Program
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArchivedProgramsPage
