"use client"

import { useState } from "react"
import { Map, Plus, Edit, Trash2, Search, Users, Target, BookOpen, MoreVertical, Play, Pause } from "lucide-react"

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedDuration: number
  totalCourses: number
  enrolledLearners: number
  completionRate: number
  status: "active" | "draft" | "archived"
  createdDate: string
  lastUpdated: string
  tags: string[]
  prerequisites: string[]
  learningObjectives: string[]
}

const LearningPathsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null)

  const mockLearningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Full-Stack Developer Path",
      description: "Comprehensive learning path from beginner to advanced full-stack development",
      category: "Technical Skills",
      difficulty: "intermediate",
      estimatedDuration: 120,
      totalCourses: 15,
      enrolledLearners: 234,
      completionRate: 78,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-15",
      tags: ["programming", "web development", "full-stack"],
      prerequisites: ["Basic computer skills", "High school math"],
      learningObjectives: [
        "Master frontend technologies",
        "Learn backend development",
        "Understand databases",
        "Deploy applications",
      ],
    },
    {
      id: "2",
      title: "Leadership Excellence Journey",
      description: "Transform from individual contributor to effective team leader and manager",
      category: "Leadership Development",
      difficulty: "intermediate",
      estimatedDuration: 80,
      totalCourses: 12,
      enrolledLearners: 156,
      completionRate: 85,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-10",
      tags: ["leadership", "management", "team building"],
      prerequisites: ["Team experience", "Communication skills"],
      learningObjectives: [
        "Develop leadership mindset",
        "Master team management",
        "Improve communication",
        "Strategic thinking",
      ],
    },
    {
      id: "3",
      title: "Sales Mastery Program",
      description: "Complete sales training covering prospecting, negotiation, and closing techniques",
      category: "Sales Training",
      difficulty: "beginner",
      estimatedDuration: 60,
      totalCourses: 10,
      enrolledLearners: 89,
      completionRate: 72,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-08",
      tags: ["sales", "negotiation", "prospecting"],
      prerequisites: ["None"],
      learningObjectives: [
        "Understand sales process",
        "Master prospecting",
        "Learn negotiation",
        "Close deals effectively",
      ],
    },
    {
      id: "4",
      title: "Customer Service Excellence",
      description: "Comprehensive training for delivering exceptional customer experiences",
      category: "Customer Service",
      difficulty: "beginner",
      estimatedDuration: 40,
      totalCourses: 8,
      enrolledLearners: 123,
      completionRate: 91,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-12",
      tags: ["customer service", "communication", "problem-solving"],
      prerequisites: ["Basic communication skills"],
      learningObjectives: [
        "Master customer communication",
        "Handle difficult situations",
        "Problem-solving skills",
        "Service excellence",
      ],
    },
    {
      id: "5",
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis, statistics, and machine learning concepts",
      category: "Technical Skills",
      difficulty: "advanced",
      estimatedDuration: 100,
      totalCourses: 18,
      enrolledLearners: 67,
      completionRate: 65,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-05",
      tags: ["data science", "statistics", "machine learning"],
      prerequisites: ["Programming basics", "College-level math"],
      learningObjectives: ["Understand data analysis", "Learn statistics", "Master ML basics", "Data visualization"],
    },
    {
      id: "6",
      title: "Project Management Professional",
      description: "Complete project management certification preparation and skills development",
      category: "Leadership Development",
      difficulty: "intermediate",
      estimatedDuration: 90,
      totalCourses: 14,
      enrolledLearners: 45,
      completionRate: 88,
      status: "draft",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-14",
      tags: ["project management", "certification", "planning"],
      prerequisites: ["Work experience", "Basic management skills"],
      learningObjectives: ["Master project planning", "Risk management", "Team coordination", "PMP certification"],
    },
    {
      id: "7",
      title: "Digital Marketing Specialist",
      description: "Comprehensive digital marketing training covering all major channels and strategies",
      category: "Sales Training",
      difficulty: "intermediate",
      estimatedDuration: 70,
      totalCourses: 11,
      enrolledLearners: 78,
      completionRate: 69,
      status: "active",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-06",
      tags: ["digital marketing", "social media", "SEO"],
      prerequisites: ["Basic marketing knowledge"],
      learningObjectives: ["Master digital channels", "SEO optimization", "Social media marketing", "Analytics skills"],
    },
    {
      id: "8",
      title: "Cybersecurity Fundamentals",
      description: "Essential cybersecurity knowledge for IT professionals and security enthusiasts",
      category: "Technical Skills",
      difficulty: "intermediate",
      estimatedDuration: 85,
      totalCourses: 13,
      enrolledLearners: 112,
      completionRate: 74,
      status: "archived",
      createdDate: "2024-01-01",
      lastUpdated: "2023-12-20",
      tags: ["cybersecurity", "security", "IT"],
      prerequisites: ["IT background", "Network knowledge"],
      learningObjectives: [
        "Understand security threats",
        "Learn protection methods",
        "Incident response",
        "Security best practices",
      ],
    },
  ]

  const categories = [
    "All Categories",
    "Technical Skills",
    "Leadership Development",
    "Sales Training",
    "Customer Service",
  ]
  const difficulties = ["All Levels", "beginner", "intermediate", "advanced"]
  const statusOptions = ["All Status", "active", "draft", "archived"]

  const filteredPaths = mockLearningPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "" || selectedCategory === "All Categories" || path.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === "" || selectedDifficulty === "All Levels" || path.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === "" || selectedStatus === "All Status" || path.status === selectedStatus

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreatePath = () => {
    setShowCreateModal(true)
    setEditingPath(null)
  }

  const handleEditPath = (path: LearningPath) => {
    setEditingPath(path)
    setShowCreateModal(true)
  }

  const handleDeletePath = (pathId: string) => {
    console.log("Deleting learning path:", pathId)
    // Show confirmation dialog and delete path
  }

  const handleToggleStatus = (pathId: string, currentStatus: string) => {
    console.log("Toggling status for path:", pathId, "from", currentStatus)
    // Toggle between active and draft
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours} hours`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return remainingHours > 0 ? `${days} days, ${remainingHours} hours` : `${days} days`
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learning Paths</h1>
        <p className="text-slate-300">Create and manage structured learning journeys for your learners</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Map className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Paths</p>
              <p className="text-2xl font-bold text-white">{mockLearningPaths.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Learners</p>
              <p className="text-2xl font-bold text-white">
                {mockLearningPaths.reduce((sum, path) => sum + path.enrolledLearners, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Courses</p>
              <p className="text-2xl font-bold text-white">
                {mockLearningPaths.reduce((sum, path) => sum + path.totalCourses, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Avg Completion</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(
                  mockLearningPaths.reduce((sum, path) => sum + path.completionRate, 0) / mockLearningPaths.length,
                )}
                %
              </p>
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
                placeholder="Search learning paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === "All Levels"
                    ? "All Levels"
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "All Status" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex border border-slate-600 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"} border-r border-slate-600`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
              >
                List
              </button>
            </div>

            <button
              onClick={handleCreatePath}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Path
            </button>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{path.title}</h3>
                    <p className="text-sm text-slate-300 mb-3 line-clamp-2">{path.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(path.status)}`}>
                      {path.status.charAt(0).toUpperCase() + path.status.slice(1)}
                    </span>
                    <button className="p-1 text-slate-400 hover:text-slate-300">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Category:</span>
                    <span className="font-medium text-white">{path.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Difficulty:</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(path.difficulty)}`}
                    >
                      {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-medium text-white">{formatDuration(path.estimatedDuration)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Courses:</span>
                    <span className="font-medium text-white">{path.totalCourses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Learners:</span>
                    <span className="font-medium text-white">{path.enrolledLearners}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Completion:</span>
                    <span className="font-medium text-white">{path.completionRate}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {path.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-600 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {path.tags.length > 3 && <span className="text-xs text-slate-400">+{path.tags.length - 3} more</span>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPath(path)}
                    className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {path.status === "active" ? (
                    <button
                      onClick={() => handleToggleStatus(path.id, path.status)}
                      className="px-3 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 rounded-md"
                      title="Pause Path"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleStatus(path.id, path.status)}
                      className="px-3 py-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded-md"
                      title="Activate Path"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePath(path.id)}
                    className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md"
                    title="Delete Path"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Learning Path
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Learners
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
                {filteredPaths.map((path) => (
                  <tr key={path.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{path.title}</div>
                        <div className="text-sm text-slate-300 line-clamp-2 max-w-xs">{path.description}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {path.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-600 text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {path.tags.length > 2 && (
                            <span className="text-xs text-slate-400">+{path.tags.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{path.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}
                      >
                        {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatDuration(path.estimatedDuration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{path.enrolledLearners}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(path.status)}`}
                      >
                        {path.status.charAt(0).toUpperCase() + path.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditPath(path)} className="text-slate-300 hover:text-white">
                          Edit
                        </button>
                        {path.status === "active" ? (
                          <button
                            onClick={() => handleToggleStatus(path.id, path.status)}
                            className="text-yellow-400 hover:text-yellow-300"
                          >
                            Pause
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(path.id, path.status)}
                            className="text-green-400 hover:text-green-300"
                          >
                            Activate
                          </button>
                        )}
                        <button onClick={() => handleDeletePath(path.id)} className="text-red-400 hover:text-red-300">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredPaths.length === 0 && (
        <div className="text-center py-12">
          <Map className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No learning paths found</h3>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Create/Edit Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4 border border-slate-700">
            <h2 className="text-lg font-medium text-white mb-4">
              {editingPath ? "Edit Learning Path" : "Create New Learning Path"}
            </h2>
            <p className="text-sm text-slate-300 mb-4">
              {editingPath
                ? "Update the learning path information below."
                : "Fill in the details to create a new learning path."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                {editingPath ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearningPathsPage
