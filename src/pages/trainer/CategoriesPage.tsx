"use client"

import { useState } from "react"
import { Folder, Plus, Edit, Trash2, Search, BookOpen, Users, Target, MoreVertical } from "lucide-react"

interface CourseCategory {
  id: string
  name: string
  description: string
  color: string
  icon: string
  courseCount: number
  totalEnrollments: number
  averageRating: number
  createdDate: string
  isActive: boolean
  parentCategory?: string
}

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(null)

  const mockCategories: CourseCategory[] = [
    {
      id: "1",
      name: "Technical Skills",
      description: "Programming, software development, and technical competencies",
      color: "blue",
      icon: "💻",
      courseCount: 24,
      totalEnrollments: 1247,
      averageRating: 4.6,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "2",
      name: "Leadership Development",
      description: "Management, leadership, and team building skills",
      color: "green",
      icon: "👥",
      courseCount: 18,
      totalEnrollments: 892,
      averageRating: 4.8,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "3",
      name: "Sales Training",
      description: "Sales techniques, negotiation, and customer acquisition",
      color: "purple",
      icon: "💰",
      courseCount: 15,
      totalEnrollments: 567,
      averageRating: 4.5,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "4",
      name: "Customer Service",
      description: "Customer support, communication, and service excellence",
      color: "orange",
      icon: "🎧",
      courseCount: 12,
      totalEnrollments: 445,
      averageRating: 4.7,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "5",
      name: "Compliance Training",
      description: "Regulatory compliance, safety, and legal requirements",
      color: "red",
      icon: "⚠️",
      courseCount: 8,
      totalEnrollments: 1234,
      averageRating: 4.3,
      createdDate: "2024-01-01",
      isActive: false,
    },
    {
      id: "6",
      name: "Soft Skills",
      description: "Communication, teamwork, and interpersonal skills",
      color: "pink",
      icon: "🤝",
      courseCount: 20,
      totalEnrollments: 678,
      averageRating: 4.6,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "7",
      name: "Product Training",
      description: "Product knowledge, features, and competitive positioning",
      color: "indigo",
      icon: "📱",
      courseCount: 10,
      totalEnrollments: 345,
      averageRating: 4.4,
      createdDate: "2024-01-01",
      isActive: true,
    },
    {
      id: "8",
      name: "Safety Training",
      description: "Workplace safety, emergency procedures, and risk management",
      color: "yellow",
      icon: "🛡️",
      courseCount: 6,
      totalEnrollments: 890,
      averageRating: 4.2,
      createdDate: "2024-01-01",
      isActive: false,
    },
  ]

  const statusOptions = ["All Status", "Active", "Inactive"]

  const filteredCategories = mockCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "All Status" ||
      (selectedStatus === "Active" ? category.isActive : !category.isActive)

    return matchesSearch && matchesStatus
  })

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-600 text-white border-blue-800",
      green: "bg-green-600 text-white border-green-800",
      purple: "bg-purple-600 text-white border-purple-800",
      orange: "bg-orange-600 text-white border-orange-800",
      red: "bg-red-600 text-white border-red-800",
      pink: "bg-pink-600 text-white border-pink-800",
      indigo: "bg-indigo-600 text-white border-indigo-800",
      yellow: "bg-yellow-600 text-white border-yellow-800",
    }
    return colorMap[color] || "bg-slate-700 text-slate-300 border-slate-600"
  }

  const handleCreateCategory = () => {
    setShowCreateModal(true)
    setEditingCategory(null)
  }

  const handleEditCategory = (category: CourseCategory) => {
    setEditingCategory(category)
    setShowCreateModal(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    console.log("Deleting category:", categoryId)
    // Show confirmation dialog and delete category
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Course Categories</h1>
        <p className="text-slate-300">Organize and manage your course categories for better content organization</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Categories</p>
              <p className="text-2xl font-bold text-white">{mockCategories.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Courses</p>
              <p className="text-2xl font-bold text-white">
                {mockCategories.reduce((sum, category) => sum + category.courseCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Enrollments</p>
              <p className="text-2xl font-bold text-white">
                {mockCategories.reduce((sum, category) => sum + category.totalEnrollments, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Active Categories</p>
              <p className="text-2xl font-bold text-white">
                {mockCategories.filter((category) => category.isActive).length}
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
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
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
              onClick={handleCreateCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${getColorClasses(category.color)}`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {category.isActive ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-300 rounded-full border border-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full border border-slate-600">
                        Inactive
                      </span>
                    )}
                    <button className="p-1 text-slate-400 hover:text-slate-200">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Courses:</span>
                    <span className="font-medium text-white">{category.courseCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Enrollments:</span>
                    <span className="font-medium text-white">{category.totalEnrollments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Rating:</span>
                    <span className="font-medium text-white">{category.averageRating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Created:</span>
                    <span className="font-medium text-white">{formatDate(category.createdDate)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md"
                    title="Delete Category"
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${getColorClasses(category.color)}`}
                        >
                          {category.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{category.name}</div>
                          <div className="text-sm text-slate-400">{category.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{category.courseCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {category.totalEnrollments.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{category.averageRating}/5.0</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatDate(category.createdDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-slate-300 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-400 hover:text-red-300"
                        >
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

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Folder className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No categories found</h3>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Create/Edit Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4 border border-slate-700">
            <h2 className="text-lg font-medium text-white mb-4">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h2>
            <p className="text-sm text-slate-300 mb-4">
              {editingCategory
                ? "Update the category information below."
                : "Fill in the details to create a new category."}
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
                {editingCategory ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesPage
