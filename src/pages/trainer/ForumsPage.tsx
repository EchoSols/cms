"use client"

import { useState } from "react"
import { MessageSquare, Plus, Search, Eye, Edit, Trash2, Lock, Pin, Flag } from "lucide-react"

interface ForumTopic {
  id: string
  title: string
  description: string
  category: string
  author: string
  replies: number
  views: number
  lastActivity: string
  status: "Active" | "Locked" | "Pinned" | "Flagged"
  tags: string[]
}

interface ForumCategory {
  id: string
  name: string
  description: string
  topics: number
  posts: number
  lastActivity: string
}

const mockCategories: ForumCategory[] = [
  {
    id: "1",
    name: "General Discussion",
    description: "General training and learning discussions",
    topics: 15,
    posts: 89,
    lastActivity: "2024-01-15",
  },
  {
    id: "2",
    name: "Technical Questions",
    description: "Technical training and implementation questions",
    topics: 23,
    posts: 156,
    lastActivity: "2024-01-20",
  },
  {
    id: "3",
    name: "Best Practices",
    description: "Sharing best practices and tips",
    topics: 8,
    posts: 45,
    lastActivity: "2024-01-18",
  },
]

const mockTopics: ForumTopic[] = [
  {
    id: "1",
    title: "How to implement effective assessment strategies?",
    description: "Looking for advice on creating assessments that truly measure learning outcomes",
    category: "Best Practices",
    author: "Sarah Johnson",
    replies: 12,
    views: 89,
    lastActivity: "2024-01-15",
    status: "Active",
    tags: ["assessment", "strategies", "learning-outcomes"],
  },
  {
    id: "2",
    title: "Project Management certification preparation tips",
    description: "Share your experience and tips for PMP certification",
    category: "Technical Questions",
    author: "David Rodriguez",
    replies: 8,
    views: 67,
    lastActivity: "2024-01-20",
    status: "Pinned",
    tags: ["pmp", "certification", "project-management"],
  },
  {
    id: "3",
    title: "Online vs In-person training effectiveness",
    description: "Discussion about the pros and cons of different training delivery methods",
    category: "General Discussion",
    author: "Emily Chen",
    replies: 15,
    views: 123,
    lastActivity: "2024-01-18",
    status: "Active",
    tags: ["online-training", "in-person", "effectiveness"],
  },
]

const ForumsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredTopics = mockTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || topic.category === categoryFilter
    const matchesStatus = statusFilter === "All" || topic.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300"
      case "Locked":
        return "bg-red-900 text-red-300"
      case "Pinned":
        return "bg-blue-900 text-blue-300"
      case "Flagged":
        return "bg-yellow-900 text-yellow-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return null
      case "Locked":
        return <Lock className="w-4 h-4" />
      case "Pinned":
        return <Pin className="w-4 h-4" />
      case "Flagged":
        return <Flag className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Discussion Forums</h1>
        <p className="text-slate-300">Manage forum discussions and moderate conversations</p>
      </div>

      {/* Forum Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockCategories.map((category) => (
          <div key={category.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">{category.name}</h3>
              <div className="p-2 bg-blue-900 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-4">{category.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Topics:</span>
                <p className="font-medium text-white">{category.topics}</p>
              </div>
              <div>
                <span className="text-slate-400">Posts:</span>
                <p className="font-medium text-white">{category.posts}</p>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-400">Last activity: {category.lastActivity}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Topic
          </button>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Categories</option>
              <option value="General Discussion">General Discussion</option>
              <option value="Technical Questions">Technical Questions</option>
              <option value="Best Practices">Best Practices</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
              <option value="Pinned">Pinned</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-white">{topic.title}</h3>
                  {topic.status !== "Active" && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(topic.status)}`}
                    >
                      {getStatusIcon(topic.status)}
                      {topic.status}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 mb-3">{topic.description}</p>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                  <span>by {topic.author}</span>
                  <span>•</span>
                  <span>{topic.category}</span>
                  <span>•</span>
                  <span>{topic.lastActivity}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {topic.tags.map((tag, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{topic.replies} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{topic.views} views</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-2 text-sm text-blue-400 hover:text-blue-300 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                  <Pin className="w-4 h-4 mr-1" />
                  Pin
                </button>
                <button className="px-3 py-2 text-sm text-red-400 hover:text-red-300 flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  Lock
                </button>
                <button className="px-3 py-2 text-sm text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Create New Topic</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-300">
                <span className="sr-only">Close</span>
                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 text-sm">×</span>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Topic Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter topic title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Describe your topic"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option value="">Select category</option>
                  <option value="General Discussion">General Discussion</option>
                  <option value="Technical Questions">Technical Questions</option>
                  <option value="Best Practices">Best Practices</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Topic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForumsPage
