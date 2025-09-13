"use client"

import type React from "react"
import { useState } from "react"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Users,
  Clock,
  Award,
  Target,
  CheckCircle,
  XCircle,
  Trash2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

interface CertificationProgram {
  id: string
  name: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  duration: string
  prerequisites: string[]
  status: "Active" | "Draft" | "Archived" | "Expired"
  enrolledCount: number
  completionRate: number
  passingScore: number
  createdBy: string
  createdAt: string
  lastModified: string
}

const mockCertificationPrograms: CertificationProgram[] = [
  {
    id: "1",
    name: "Project Management Professional (PMP)",
    description: "Comprehensive project management certification covering methodologies, tools, and best practices.",
    category: "Project Management",
    level: "Advanced",
    duration: "6 months",
    prerequisites: ["Bachelor's degree", "3 years experience", "4500 hours leading projects"],
    status: "Active",
    enrolledCount: 45,
    completionRate: 78,
    passingScore: 75,
    createdBy: "John Smith",
    createdAt: "2024-01-15",
    lastModified: "2024-01-15",
  },
  {
    id: "2",
    name: "Data Science Fundamentals",
    description: "Foundation course in data science covering statistics, programming, and machine learning basics.",
    category: "Data Science",
    level: "Beginner",
    duration: "4 months",
    prerequisites: ["Basic math skills", "No prior experience required"],
    status: "Active",
    enrolledCount: 67,
    completionRate: 85,
    passingScore: 70,
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-10",
    lastModified: "2024-01-10",
  },
  {
    id: "3",
    name: "Cybersecurity Specialist",
    description:
      "Advanced cybersecurity certification covering threat analysis, incident response, and security architecture.",
    category: "Cybersecurity",
    level: "Expert",
    duration: "8 months",
    prerequisites: ["5 years IT experience", "Network security background", "Security+ certification"],
    status: "Active",
    enrolledCount: 23,
    completionRate: 65,
    passingScore: 80,
    createdBy: "Mike Chen",
    createdAt: "2024-01-08",
    lastModified: "2024-01-08",
  },
  {
    id: "4",
    name: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing certification covering SEO, social media, and analytics.",
    category: "Marketing",
    level: "Intermediate",
    duration: "5 months",
    prerequisites: ["Basic marketing knowledge", "Social media experience"],
    status: "Draft",
    enrolledCount: 0,
    completionRate: 0,
    passingScore: 70,
    createdBy: "Lisa Wang",
    createdAt: "2024-01-12",
    lastModified: "2024-01-12",
  },
  {
    id: "5",
    name: "Agile Scrum Master",
    description: "Agile methodology certification focusing on Scrum framework and team leadership.",
    category: "Agile",
    level: "Intermediate",
    duration: "3 months",
    prerequisites: ["Project experience", "Team collaboration skills"],
    status: "Active",
    enrolledCount: 89,
    completionRate: 92,
    passingScore: 75,
    createdBy: "David Brown",
    createdAt: "2024-01-05",
    lastModified: "2024-01-05",
  },
]

const CertificationProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<CertificationProgram[]>(mockCertificationPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [levelFilter, setLevelFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<CertificationProgram | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ["All", "Project Management", "Data Science", "Cybersecurity", "Marketing", "Agile"]
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Expert"]
  const statuses = ["All", "Active", "Draft", "Archived", "Expired"]

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || program.category === categoryFilter
    const matchesLevel = levelFilter === "All" || program.level === levelFilter
    const matchesStatus = statusFilter === "All" || program.status === statusFilter

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus
  })

  const stats = {
    total: programs.length,
    active: programs.filter((p) => p.status === "Active").length,
    draft: programs.filter((p) => p.status === "Draft").length,
    archived: programs.filter((p) => p.status === "Archived").length,
    totalEnrolled: programs.reduce((sum, p) => sum + p.enrolledCount, 0),
    avgCompletion: Math.round(programs.reduce((sum, p) => sum + p.completionRate, 0) / programs.length),
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

  const openProgramModal = (program: CertificationProgram) => {
    setSelectedProgram(program)
    setShowModal(true)
  }

  const handleDeleteProgram = (programId: string) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      setPrograms((prev) => prev.filter((p) => p.id !== programId))
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Certification Programs</h1>
          <p className="text-slate-300">Manage and oversee certification programs for learners</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-300">Total Programs</p>
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
                <p className="text-sm font-medium text-slate-300">Total Enrolled</p>
                <p className="text-2xl font-bold text-white">{stats.totalEnrolled}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-300">Avg Completion</p>
                <p className="text-2xl font-bold text-white">{stats.avgCompletion}%</p>
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
            Create Program
          </button>

          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors duration-200">
              Export Programs
            </button>
            <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors duration-200">
              Import Programs
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
                  placeholder="Search programs by name or description..."
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
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Marketing">Marketing</option>
                <option value="Agile">Agile</option>
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
                <option value="Expert">Expert</option>
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
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Program Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{program.name}</h3>
                    <p className="text-sm text-slate-300 mb-3">{program.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                      {program.level}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white ml-2">{program.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white ml-2">{program.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Enrolled:</span>
                    <span className="text-white ml-2">{program.enrolledCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Completion:</span>
                    <span className="text-white ml-2">{program.completionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Program Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Prerequisites</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.prerequisites.map((prereq, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span>Passing Score: {program.passingScore}%</span>
                  <span>Created: {program.createdAt}</span>
                </div>

                <div className="text-xs text-slate-400 mb-4">
                  <p>Created by: {program.createdBy}</p>
                  <p>Last modified: {program.lastModified}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => openProgramModal(program)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>

                  <button className="px-3 py-2 text-sm border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="px-3 py-2 text-sm border border-slate-600 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Modal */}
        {showModal && selectedProgram && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{selectedProgram.name}</h2>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-300">
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Program Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-400">Description:</span>
                        <p className="text-sm text-white mt-1">{selectedProgram.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-slate-400">Category:</span>
                          <p className="text-sm text-white mt-1">{selectedProgram.category}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Level:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedProgram.level)} mt-1 inline-block`}
                          >
                            {selectedProgram.level}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Duration:</span>
                          <p className="text-sm text-white mt-1">{selectedProgram.duration}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Modules:</span>
                          <p className="text-sm text-white mt-1">{selectedProgram.prerequisites.length}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Total Hours:</span>
                          <p className="text-sm text-white mt-1">Not Available</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProgram.status)} mt-1 inline-block`}
                          >
                            {selectedProgram.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Requirements & Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-400">Requirements:</span>
                        <ul className="mt-2 space-y-1">
                          {selectedProgram.prerequisites.map((req, index) => (
                            <li key={index} className="text-sm text-white flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-slate-400">Validity Period:</span>
                          <p className="text-sm text-white mt-1">Not Available</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Passing Score:</span>
                          <p className="text-sm text-white mt-1">{selectedProgram.passingScore}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold text-white">{selectedProgram.enrolledCount}</p>
                          <p className="text-sm text-slate-400">Enrolled Learners</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold text-white">{selectedProgram.completionRate}%</p>
                          <p className="text-sm text-slate-400">Completion Rate</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold text-white">Not Available</p>
                          <p className="text-sm text-slate-400">Total Hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      <span>Created by: </span>
                      <span className="font-medium text-white">{selectedProgram.createdBy}</span>
                      <span className="mx-2">•</span>
                      <span>Last updated: </span>
                      <span className="font-medium text-white">{selectedProgram.lastModified}</span>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                        Edit Program
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Manage Learners
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Program Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Create New Certification Program</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-300">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Program Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="Enter program name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                    <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                      <option>Project Management</option>
                      <option>Agile Development</option>
                      <option>Data Science</option>
                      <option>Leadership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    rows={3}
                    placeholder="Enter program description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Level</label>
                    <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Duration</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="e.g., 3 months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Passing Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                      placeholder="80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Prerequisites</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
                    placeholder="Enter prerequisites separated by commas"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Create Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationProgramsPage
