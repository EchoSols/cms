"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Search, Calendar, Clock, Users, MapPin, Video, BookOpen, Eye, Edit, Trash2 } from "lucide-react"

interface ScheduleItem {
  id: string
  title: string
  type: "Training" | "Meeting" | "Office Hours" | "Preparation"
  date: string
  startTime: string
  endTime: string
  location: string
  participants: number
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
  description: string
}

const mockSchedule: ScheduleItem[] = [
  {
    id: "1",
    title: "Project Management Training",
    type: "Training",
    date: "2024-12-20",
    startTime: "09:00",
    endTime: "17:00",
    location: "Training Room A",
    participants: 25,
    status: "Scheduled",
    description: "Full-day training session on project management fundamentals",
  },
  {
    id: "2",
    title: "Team Standup Meeting",
    type: "Meeting",
    date: "2024-12-20",
    startTime: "08:30",
    endTime: "09:00",
    location: "Conference Room B",
    participants: 8,
    status: "Scheduled",
    description: "Daily team synchronization meeting",
  },
  {
    id: "3",
    title: "Office Hours",
    type: "Office Hours",
    date: "2024-12-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Office 205",
    participants: 0,
    status: "Scheduled",
    description: "Open office hours for student consultations",
  },
]

const InstructorSchedulePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredSchedule = mockSchedule.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-900 text-white"
      case "In Progress":
        return "bg-green-900 text-white"
      case "Completed":
        return "bg-gray-900 text-white"
      case "Cancelled":
        return "bg-red-900 text-white"
      default:
        return "bg-gray-900 text-white"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Training":
        return <BookOpen className="w-4 h-4" />
      case "Meeting":
        return <Users className="w-4 h-4" />
      case "Office Hours":
        return <Clock className="w-4 h-4" />
      case "Preparation":
        return <Video className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const stats = {
    total: mockSchedule.length,
    training: mockSchedule.filter((s) => s.type === "Training").length,
    meetings: mockSchedule.filter((s) => s.type === "Meeting").length,
    officeHours: mockSchedule.filter((s) => s.type === "Office Hours").length,
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Instructor Schedule</h1>
          <p className="text-slate-300">Manage your training schedule and appointments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Items</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Training Sessions</p>
              <p className="text-2xl font-bold text-green-400">{stats.training}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Meetings</p>
              <p className="text-2xl font-bold text-blue-400">{stats.meetings}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Office Hours</p>
              <p className="text-2xl font-bold text-purple-400">{stats.officeHours}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search schedule items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Training">Training</option>
              <option value="Meeting">Meeting</option>
              <option value="Office Hours">Office Hours</option>
              <option value="Preparation">Preparation</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Schedule Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Location
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
              {filteredSchedule.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                          {getTypeIcon(item.type)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{item.title}</div>
                        <div className="text-sm text-slate-300">{item.type}</div>
                        <div className="text-xs text-slate-400">{item.participants} participants</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">{item.date}</div>
                      <div className="text-sm text-slate-300">
                        {item.startTime} - {item.endTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-white">{item.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item)
                          setShowDetails(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
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

      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Schedule Item Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-300">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Title</label>
                  <p className="mt-1 text-sm text-white">{selectedItem.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Type</label>
                  <p className="mt-1 text-sm text-white">{selectedItem.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Date</label>
                  <p className="mt-1 text-sm text-white">{selectedItem.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Time</label>
                  <p className="mt-1 text-sm text-white">
                    {selectedItem.startTime} - {selectedItem.endTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Location</label>
                  <p className="mt-1 text-sm text-white">{selectedItem.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Participants</label>
                  <p className="mt-1 text-sm text-white">{selectedItem.participants}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedItem.status)}`}
                  >
                    {selectedItem.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Description</label>
                <p className="mt-1 text-sm text-white">{selectedItem.description}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Edit Item
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Add Schedule Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-300">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Type</label>
                  <select className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select type</option>
                    <option>Training</option>
                    <option>Meeting</option>
                    <option>Office Hours</option>
                    <option>Preparation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Start Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">End Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Location</label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InstructorSchedulePage
