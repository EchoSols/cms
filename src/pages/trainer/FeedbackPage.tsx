"use client"

import { useState } from "react"
import { MessageSquare, Star, Search, Eye, Reply, Download, ThumbsUp, AlertCircle } from "lucide-react"

interface FeedbackItem {
  id: string
  learnerName: string
  courseName: string
  rating: number
  comment: string
  category: "General" | "Content" | "Instructor" | "Technical" | "Support"
  sentiment: "Positive" | "Neutral" | "Negative"
  status: "New" | "Reviewed" | "Responded" | "Resolved"
  date: string
  priority: "Low" | "Medium" | "High"
}

const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    learnerName: "Sarah Johnson",
    courseName: "Project Management Fundamentals",
    rating: 5,
    comment:
      "Excellent course! The instructor was very knowledgeable and the content was well-structured. I learned a lot about project management principles.",
    category: "General",
    sentiment: "Positive",
    status: "New",
    date: "2024-01-20",
    priority: "Low",
  },
  {
    id: "2",
    learnerName: "David Rodriguez",
    courseName: "Agile Development Practices",
    rating: 3,
    comment:
      "The course content was good but I found some sections too advanced for beginners. Could use more examples and hands-on exercises.",
    category: "Content",
    sentiment: "Neutral",
    status: "Reviewed",
    date: "2024-01-18",
    priority: "Medium",
  },
  {
    id: "3",
    learnerName: "Emily Chen",
    courseName: "Data Analysis Basics",
    rating: 4,
    comment:
      "Great introduction to data analysis. The instructor explained complex concepts clearly. Would love to see more advanced topics covered.",
    category: "Instructor",
    sentiment: "Positive",
    status: "Responded",
    date: "2024-01-15",
    priority: "Low",
  },
]

const FeedbackPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sentimentFilter, setSentimentFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)

  const filteredFeedback = mockFeedback.filter((feedback) => {
    const matchesSearch =
      feedback.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || feedback.category === categoryFilter
    const matchesSentiment = sentimentFilter === "All" || feedback.sentiment === sentimentFilter
    const matchesStatus = statusFilter === "All" || feedback.status === statusFilter
    return matchesSearch && matchesCategory && matchesSentiment && matchesStatus
  })

  const stats = {
    totalFeedback: mockFeedback.length,
    averageRating: Math.round((mockFeedback.reduce((acc, f) => acc + f.rating, 0) / mockFeedback.length) * 10) / 10,
    positiveSentiment: mockFeedback.filter((f) => f.sentiment === "Positive").length,
    newFeedback: mockFeedback.filter((f) => f.status === "New").length,
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-900 text-green-300"
      case "Neutral":
        return "bg-yellow-900 text-yellow-300"
      case "Negative":
        return "bg-red-900 text-red-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-900 text-blue-300"
      case "Reviewed":
        return "bg-yellow-900 text-yellow-300"
      case "Responded":
        return "bg-green-900 text-green-300"
      case "Resolved":
        return "bg-purple-900 text-purple-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-900 text-green-300"
      case "Medium":
        return "bg-yellow-900 text-yellow-300"
      case "High":
        return "bg-red-900 text-red-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learner Feedback</h1>
        <p className="text-slate-300">View and analyze learner feedback and survey responses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Feedback</p>
              <p className="text-2xl font-bold text-white">{stats.totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-900 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Average Rating</p>
              <p className="text-2xl font-bold text-white">{stats.averageRating}/5</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Positive Feedback</p>
              <p className="text-2xl font-bold text-white">{stats.positiveSentiment}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-900 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">New Feedback</p>
              <p className="text-2xl font-bold text-white">{stats.newFeedback}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search feedback..."
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
              <option value="General">General</option>
              <option value="Content">Content</option>
              <option value="Instructor">Instructor</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>

            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Responded">Responded</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div key={feedback.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-white">{feedback.learnerName}</h3>
                  <span className="text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-400">{feedback.courseName}</span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(feedback.rating)}
                    <span className="ml-2 text-sm text-slate-300">({feedback.rating}/5)</span>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}
                  >
                    {feedback.sentiment}
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}
                  >
                    {feedback.status}
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}
                  >
                    {feedback.priority} Priority
                  </span>
                </div>

                <p className="text-sm text-slate-300 mb-3">{feedback.comment}</p>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>Category: {feedback.category}</span>
                  <span>•</span>
                  <span>Date: {feedback.date}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFeedback(feedback)}
                className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 flex items-center"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </button>
              <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                <Reply className="w-4 h-4 mr-1" />
                Respond
              </button>
              <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Details Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Feedback Details</h3>
              <button onClick={() => setSelectedFeedback(null)} className="text-slate-400 hover:text-slate-300">
                <span className="sr-only">Close</span>
                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 text-sm">×</span>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Learner Name</label>
                  <p className="text-sm text-white">{selectedFeedback.learnerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Course</label>
                  <p className="text-sm text-white">{selectedFeedback.courseName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {renderStars(selectedFeedback.rating)}
                  <span className="text-sm text-slate-300">({selectedFeedback.rating}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Comment</label>
                <p className="text-sm text-white bg-slate-700 p-3 rounded-lg">{selectedFeedback.comment}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(selectedFeedback.category)}`}
                  >
                    {selectedFeedback.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Sentiment</label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(selectedFeedback.sentiment)}`}
                  >
                    {selectedFeedback.sentiment}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedFeedback.priority)}`}
                  >
                    {selectedFeedback.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedFeedback.status)}`}
                  >
                    {selectedFeedback.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
                  <p className="text-sm text-white">{selectedFeedback.date}</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700">
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Respond to Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackPage
