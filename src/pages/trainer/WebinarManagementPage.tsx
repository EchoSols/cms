"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Search, Eye, Edit, Trash2, Video, Clock, Users, Play, Globe, FileText, Link } from "lucide-react"

interface Webinar {
  id: string
  title: string
  description: string
  host: string
  date: string
  startTime: string
  endTime: string
  maxAttendees: number
  registeredAttendees: number
  status: "Scheduled" | "Live" | "Completed" | "Cancelled"
  type: "Public" | "Private" | "Corporate"
  category: string
  webinarLink: string
  recordingUrl?: string
  materials: string[]
  tags: string[]
}

const mockWebinars: Webinar[] = [
  {
    id: "1",
    title: "Digital Transformation Strategies",
    description: "Learn about modern digital transformation approaches for enterprises",
    host: "Dr. Sarah Johnson",
    date: "2024-12-25",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    maxAttendees: 200,
    registeredAttendees: 156,
    status: "Scheduled",
    type: "Public",
    category: "Digital Strategy",
    webinarLink: "https://zoom.us/j/123456789",
    materials: ["Digital_Transformation_Guide.pdf", "Case_Studies.pptx"],
    tags: ["Digital", "Transformation", "Strategy", "Enterprise"],
  },
  {
    id: "2",
    title: "AI in Project Management",
    description: "Exploring AI tools and techniques for project management",
    host: "Mike Chen",
    date: "2024-12-26",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    maxAttendees: 150,
    registeredAttendees: 150,
    status: "Live",
    type: "Corporate",
    category: "Artificial Intelligence",
    webinarLink: "https://teams.microsoft.com/l/meetup-join/456",
    materials: ["AI_PM_Tools.pdf", "Demo_Instructions.docx"],
    tags: ["AI", "Project Management", "Automation"],
  },
  {
    id: "3",
    title: "Cybersecurity Best Practices",
    description: "Essential cybersecurity practices for modern organizations",
    host: "Lisa Rodriguez",
    date: "2024-12-24",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    maxAttendees: 300,
    registeredAttendees: 245,
    status: "Completed",
    type: "Public",
    category: "Cybersecurity",
    webinarLink: "https://meet.google.com/abc-defg-hij",
    recordingUrl: "https://drive.google.com/recording456",
    materials: ["Security_Handbook.pdf", "Checklist.docx"],
    tags: ["Cybersecurity", "Security", "Best Practices"],
  },
]

const WebinarManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredWebinars = mockWebinars.filter((webinar) => {
    const matchesSearch =
      webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.host.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || webinar.status === statusFilter
    const matchesType = typeFilter === "all" || webinar.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-900 text-blue-300"
      case "Live":
        return "bg-green-900 text-green-300"
      case "Completed":
        return "bg-slate-700 text-slate-300"
      case "Cancelled":
        return "bg-red-900 text-red-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Public":
        return "bg-green-900 text-green-300"
      case "Private":
        return "bg-blue-900 text-blue-300"
      case "Corporate":
        return "bg-purple-900 text-purple-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const stats = {
    total: mockWebinars.length,
    scheduled: mockWebinars.filter((w) => w.status === "Scheduled").length,
    live: mockWebinars.filter((w) => w.status === "Live").length,
    completed: mockWebinars.filter((w) => w.status === "Completed").length,
    totalAttendees: mockWebinars.reduce((sum, webinar) => sum + webinar.registeredAttendees, 0),
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Webinar Management</h1>
          <p className="text-slate-300">Schedule and manage webinars for training and knowledge sharing</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Webinar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Webinars</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Video className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Live Now</p>
              <p className="text-2xl font-bold text-green-600">{stats.live}</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Completed</p>
              <p className="text-2xl font-bold text-slate-400">{stats.completed}</p>
            </div>
            <Users className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Attendees</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalAttendees}</p>
            </div>
            <Globe className="w-8 h-8 text-purple-600" />
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
                placeholder="Search webinars, hosts, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Webinars Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Webinar Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Host & Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredWebinars.map((webinar) => (
                <tr key={webinar.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                          <Video className="w-5 h-5 text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{webinar.title}</div>
                        <div className="text-sm text-slate-300">{webinar.description}</div>
                        <div className="text-xs text-slate-400">{webinar.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{webinar.host}</div>
                      <div className="text-sm text-slate-300">{webinar.date}</div>
                      <div className="text-xs text-slate-400">
                        {webinar.startTime} - {webinar.endTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">
                        {webinar.registeredAttendees}/{webinar.maxAttendees}
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(webinar.registeredAttendees / webinar.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webinar.status)}`}
                      >
                        {webinar.status}
                      </span>
                      <div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(webinar.type)}`}
                        >
                          {webinar.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedWebinar(webinar)
                          setShowDetailsModal(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {webinar.status === "Scheduled" && (
                        <button className="text-green-400 hover:text-green-300">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-purple-400 hover:text-purple-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
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

      {/* Details Modal */}
      {showDetailsModal && selectedWebinar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Webinar Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-slate-300">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Title</label>
                  <p className="mt-1 text-sm text-white">{selectedWebinar.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedWebinar.status)}`}
                  >
                    {selectedWebinar.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Type</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedWebinar.type)}`}
                  >
                    {selectedWebinar.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Category</label>
                  <p className="mt-1 text-sm text-white">{selectedWebinar.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Host</label>
                  <p className="mt-1 text-sm text-white">{selectedWebinar.host}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Date</label>
                  <p className="mt-1 text-sm text-white">{selectedWebinar.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Time</label>
                  <p className="mt-1 text-sm text-white">
                    {selectedWebinar.startTime} - {selectedWebinar.endTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Attendees</label>
                  <p className="mt-1 text-sm text-white">
                    {selectedWebinar.registeredAttendees}/{selectedWebinar.maxAttendees}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Description</label>
                <p className="mt-1 text-sm text-white">{selectedWebinar.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Webinar Link</label>
                <a
                  href={selectedWebinar.webinarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Link className="w-4 h-4" />
                  Join Webinar
                </a>
              </div>

              {selectedWebinar.recordingUrl && (
                <div>
                  <label className="block text-sm font-medium text-slate-300">Recording</label>
                  <a
                    href={selectedWebinar.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-blue-400 hover:text-blue-300"
                  >
                    View Recording
                  </a>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300">Materials</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedWebinar.materials.map((material, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedWebinar.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Edit Webinar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebinarManagementPage
