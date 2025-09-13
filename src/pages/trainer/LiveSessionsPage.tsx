"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Search, Eye, Edit, Trash2, Video, Clock, Users, Play, Pause } from "lucide-react"

interface LiveSession {
  id: string
  title: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  maxParticipants: number
  currentParticipants: number
  status: "Scheduled" | "Live" | "Completed" | "Cancelled"
  type: "Webinar" | "Workshop" | "Training"
  category: string
}

const mockLiveSessions: LiveSession[] = [
  {
    id: "1",
    title: "Advanced Project Management",
    instructor: "John Smith",
    date: "2024-12-20",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    maxParticipants: 50,
    currentParticipants: 42,
    status: "Scheduled",
    type: "Training",
    category: "Project Management",
  },
  {
    id: "2",
    title: "Agile Scrum Workshop",
    instructor: "Sarah Johnson",
    date: "2024-12-21",
    startTime: "2:00 PM",
    endTime: "4:30 PM",
    maxParticipants: 30,
    currentParticipants: 30,
    status: "Live",
    type: "Workshop",
    category: "Agile",
  },
  {
    id: "3",
    title: "ITIL Service Design Q&A",
    instructor: "Mike Davis",
    date: "2024-12-19",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    maxParticipants: 100,
    currentParticipants: 78,
    status: "Completed",
    type: "Webinar",
    category: "IT Service Management",
  },
]

const LiveSessionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredSessions = mockLiveSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Live":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: mockLiveSessions.length,
    scheduled: mockLiveSessions.filter((s) => s.status === "Scheduled").length,
    live: mockLiveSessions.filter((s) => s.status === "Live").length,
    completed: mockLiveSessions.filter((s) => s.status === "Completed").length,
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Training Sessions</h1>
          <p className="text-slate-300">Schedule and manage live training sessions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Sessions</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Video className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live Now</p>
              <p className="text-2xl font-bold text-green-600">{stats.live}</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-slate-400">{stats.completed}</p>
            </div>
            <Users className="w-8 h-8 text-slate-400" />
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
                placeholder="Search sessions or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Session Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Instructor & Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Participants
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
              {filteredSessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Video className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{session.title}</div>
                        <div className="text-sm text-slate-400">{session.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{session.instructor}</div>
                      <div className="text-sm text-slate-400">{session.date}</div>
                      <div className="text-xs text-slate-500">
                        {session.startTime} - {session.endTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">
                        {session.currentParticipants}/{session.maxParticipants}
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(session.currentParticipants / session.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}
                      >
                        {session.status}
                      </span>
                      <div className="text-xs text-slate-400">{session.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSession(session)
                          setShowDetailsModal(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {session.status === "Scheduled" && (
                        <button className="text-green-400 hover:text-green-300">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      {session.status === "Live" && (
                        <button className="text-yellow-400 hover:text-yellow-300">
                          <Pause className="w-4 h-4" />
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
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Session Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-slate-300">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Title</label>
                  <p className="mt-1 text-sm text-white">{selectedSession.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSession.status)}`}
                  >
                    {selectedSession.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Type</label>
                  <p className="mt-1 text-sm text-white">{selectedSession.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Category</label>
                  <p className="mt-1 text-sm text-white">{selectedSession.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Instructor</label>
                  <p className="mt-1 text-sm text-white">{selectedSession.instructor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Date</label>
                  <p className="mt-1 text-sm text-white">{selectedSession.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Time</label>
                  <p className="mt-1 text-sm text-white">
                    {selectedSession.startTime} - {selectedSession.endTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Participants</label>
                  <p className="mt-1 text-sm text-white">
                    {selectedSession.currentParticipants}/{selectedSession.maxParticipants}
                  </p>
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
                Edit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveSessionsPage
