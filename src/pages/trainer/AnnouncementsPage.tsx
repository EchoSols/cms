"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Plus, Edit, Trash2, Users, Tag, Search, Eye } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  type: "General" | "Training" | "Important" | "Reminder"
  priority: "Low" | "Medium" | "High"
  targetAudience: string[]
  status: "Draft" | "Published" | "Archived"
  publishDate: string
  expiryDate?: string
  createdBy: string
  createdAt: string
  readCount: number
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Project Management Course Available",
    content:
      "We are excited to announce the launch of our new Advanced Project Management course. This comprehensive program covers modern project management methodologies and tools.",
    type: "Training",
    priority: "High",
    targetAudience: ["All Learners", "Project Managers"],
    status: "Published",
    publishDate: "2024-12-20",
    expiryDate: "2025-01-20",
    createdBy: "Sarah Johnson",
    createdAt: "2024-12-19",
    readCount: 45,
  },
  {
    id: "2",
    title: "Holiday Schedule Reminder",
    content:
      "Please note that training sessions will be suspended during the holiday period from December 24th to January 2nd. Regular sessions will resume on January 3rd.",
    type: "Reminder",
    priority: "Medium",
    targetAudience: ["All Learners"],
    status: "Published",
    publishDate: "2024-12-18",
    createdBy: "Sarah Johnson",
    createdAt: "2024-12-17",
    readCount: 89,
  },
  {
    id: "3",
    title: "Agile Certification Deadline",
    content:
      "The deadline for Agile certification submissions is approaching. Please ensure all assessments are completed by December 31st to be eligible for this quarter's certification.",
    type: "Important",
    priority: "High",
    targetAudience: ["Agile Learners", "Certification Candidates"],
    status: "Published",
    publishDate: "2024-12-15",
    expiryDate: "2024-12-31",
    createdBy: "Sarah Johnson",
    createdAt: "2024-12-14",
    readCount: 23,
  },
]

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || announcement.type === typeFilter
    const matchesPriority = priorityFilter === "all" || announcement.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || announcement.status === statusFilter

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "General":
        return "bg-slate-700 text-slate-300"
      case "Training":
        return "bg-blue-900 text-blue-300"
      case "Important":
        return "bg-red-900 text-red-300"
      case "Reminder":
        return "bg-yellow-900 text-yellow-300"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-slate-700 text-slate-300"
      case "Published":
        return "bg-green-900 text-green-300"
      case "Archived":
        return "bg-red-900 text-red-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id))
    }
  }

  const stats = {
    total: announcements.length,
    published: announcements.filter((a) => a.status === "Published").length,
    drafts: announcements.filter((a) => a.status === "Draft").length,
    highPriority: announcements.filter((a) => a.priority === "High").length,
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
          <p className="text-slate-300">Create and manage training announcements for your learners</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Published</p>
              <p className="text-2xl font-bold text-green-400">{stats.published}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Drafts</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.drafts}</p>
            </div>
            <Edit className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">High Priority</p>
              <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
            </div>
            <Tag className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Types</option>
              <option value="General">General</option>
              <option value="Training">Training</option>
              <option value="Important">Important</option>
              <option value="Reminder">Reminder</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Announcement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Type & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status & Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{announcement.title}</div>
                      <div className="text-sm text-slate-300 mt-1 line-clamp-2">{announcement.content}</div>
                      <div className="flex items-center mt-2 text-xs text-slate-400">
                        <Users className="w-3 h-3 mr-1" />
                        {announcement.readCount} reads
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(announcement.type)}`}
                      >
                        {announcement.type}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {announcement.targetAudience.map((audience, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-blue-900 text-blue-300 rounded mr-1 mb-1"
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(announcement.status)}`}
                      >
                        {announcement.status}
                      </span>
                      <div className="text-xs text-slate-400">
                        <div>Published: {announcement.publishDate}</div>
                        {announcement.expiryDate && <div>Expires: {announcement.expiryDate}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingAnnouncement(announcement)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(announcement.id)} className="text-red-400 hover:text-red-300">
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

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No announcements found</h3>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsPage
