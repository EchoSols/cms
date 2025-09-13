"use client"

import type React from "react"
import { useState } from "react"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  BarChart3,
  FileText,
} from "lucide-react"

interface CertificationTest {
  id: string
  name: string
  description: string
  programName: string
  category: string
  type: "Multiple Choice" | "Essay" | "Practical" | "Mixed"
  duration: number // in minutes
  totalQuestions: number
  passingScore: number
  status: "Active" | "Draft" | "Archived"
  attempts: number
  averageScore: number
  createdBy: string
  createdAt: string
  lastModified: string
}

const mockTests: CertificationTest[] = [
  {
    id: "1",
    name: "PMP Certification Exam",
    description: "Comprehensive assessment covering all PMP knowledge areas",
    programName: "Project Management Professional (PMP)",
    category: "Project Management",
    type: "Multiple Choice",
    duration: 240,
    totalQuestions: 200,
    passingScore: 80,
    status: "Active",
    attempts: 156,
    averageScore: 78.5,
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2024-01-15",
    lastModified: "2024-12-10",
  },
  {
    id: "2",
    name: "Scrum Master Assessment",
    description: "Practical assessment of Scrum methodology and leadership skills",
    programName: "Certified Scrum Master (CSM)",
    category: "Agile Development",
    type: "Mixed",
    duration: 120,
    totalQuestions: 75,
    passingScore: 75,
    status: "Active",
    attempts: 89,
    averageScore: 82.3,
    createdBy: "Prof. Michael Chen",
    createdAt: "2024-02-20",
    lastModified: "2024-12-08",
  },
  {
    id: "3",
    name: "Data Science Fundamentals Quiz",
    description: "Basic assessment covering statistics, Python, and data analysis",
    programName: "Data Science Fundamentals",
    category: "Data Science",
    type: "Multiple Choice",
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    status: "Active",
    attempts: 67,
    averageScore: 85.7,
    createdBy: "Dr. Lisa Wang",
    createdAt: "2024-03-10",
    lastModified: "2024-12-05",
  },
  {
    id: "4",
    name: "Leadership Competency Evaluation",
    description: "Comprehensive evaluation of leadership skills and decision-making",
    programName: "Advanced Leadership Certificate",
    category: "Leadership",
    type: "Essay",
    duration: 180,
    totalQuestions: 10,
    passingScore: 85,
    status: "Draft",
    attempts: 0,
    averageScore: 0,
    createdBy: "Prof. Robert Smith",
    createdAt: "2024-11-15",
    lastModified: "2024-12-01",
  },
]

const CertificationTestsPage: React.FC = () => {
  const [tests, setTests] = useState<CertificationTest[]>(mockTests)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTest, setSelectedTest] = useState<CertificationTest | null>(null)

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.programName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || test.category === categoryFilter
    const matchesType = typeFilter === "All" || test.type === typeFilter
    const matchesStatus = statusFilter === "All" || test.status === statusFilter
    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  const stats = {
    total: tests.length,
    active: tests.filter((t) => t.status === "Active").length,
    draft: tests.filter((t) => t.status === "Draft").length,
    totalAttempts: tests.reduce((sum, t) => sum + t.attempts, 0),
    avgScore: Math.round(tests.reduce((sum, t) => sum + t.averageScore, 0) / tests.length),
  }

  const handleDeleteTest = (testId: string) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setTests((prev) => prev.filter((t) => t.id !== testId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300"
      case "Draft":
        return "bg-yellow-900 text-yellow-300"
      case "Archived":
        return "bg-slate-700 text-slate-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Multiple Choice":
        return "bg-blue-900 text-blue-300"
      case "Essay":
        return "bg-purple-900 text-purple-300"
      case "Practical":
        return "bg-green-900 text-green-300"
      case "Mixed":
        return "bg-orange-900 text-orange-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Certification Tests</h1>
        <p className="text-slate-300">Create and manage certification tests and assessments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Tests</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Active</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Draft</p>
              <p className="text-2xl font-bold text-white">{stats.draft}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Attempts</p>
              <p className="text-2xl font-bold text-white">{stats.totalAttempts}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Avg Score</p>
              <p className="text-2xl font-bold text-white">{stats.avgScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Test
        </button>

        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors duration-200">
            Export Results
          </button>
          <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors duration-200">
            Question Bank
          </button>
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
                placeholder="Search tests by name, description, or program..."
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
              <option value="Agile Development">Agile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Leadership">Leadership</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Types</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="Essay">Essay</option>
              <option value="Practical">Practical</option>
              <option value="Mixed">Mixed</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Test Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{test.name}</h3>
                  <p className="text-sm text-slate-300 mb-2">{test.description}</p>
                  <p className="text-sm text-blue-400">{test.programName}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                    {test.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(test.type)}`}>
                    {test.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white ml-2">{test.duration} min</span>
                </div>
                <div>
                  <span className="text-slate-400">Questions:</span>
                  <span className="text-white ml-2">{test.totalQuestions}</span>
                </div>
                <div>
                  <span className="text-slate-400">Passing Score:</span>
                  <span className="text-white ml-2">{test.passingScore}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Attempts:</span>
                  <span className="text-white ml-2">{test.attempts}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Average Score</span>
                  <span className="text-white">{test.averageScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${test.averageScore}%` }}></div>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-4">
                <p>Created by: {test.createdBy}</p>
                <p>Created: {test.createdAt}</p>
                <p>Last modified: {test.lastModified}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTest(test)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>

                <button className="px-3 py-2 text-sm border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="px-3 py-2 text-sm border border-slate-600 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Test Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Test</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-300">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Test Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    placeholder="Enter test name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Program</label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option>Project Management Professional (PMP)</option>
                    <option>Certified Scrum Master (CSM)</option>
                    <option>Data Science Fundamentals</option>
                    <option>Advanced Leadership Certificate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                  rows={3}
                  placeholder="Enter test description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option>Multiple Choice</option>
                    <option>Essay</option>
                    <option>Practical</option>
                    <option>Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Duration (min)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    placeholder="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Questions</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Passing Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    placeholder="75"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificationTestsPage
