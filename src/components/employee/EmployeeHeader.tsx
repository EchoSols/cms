"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, Settings, LogOut, Clock, Calendar, FileText, Award } from "lucide-react"

interface EmployeeHeaderProps {
  onMenuClick: () => void
}

const EmployeeHeader = ({ onMenuClick }: EmployeeHeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "Leave request approved",
      message: "Your vacation request for Dec 20-22 has been approved",
      time: "1 hour ago",
      unread: true,
      type: "success",
    },
    {
      id: 2,
      title: "Performance review reminder",
      message: "Complete your self-assessment by Dec 15",
      time: "2 hours ago",
      unread: true,
      type: "action",
    },
    {
      id: 3,
      title: "Training course available",
      message: "New course: Advanced Excel Skills",
      time: "1 day ago",
      unread: false,
      type: "info",
    },
  ]

  return (
    <header className="bg-slate-900 shadow-sm border-b border-slate-700 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>

          {/* Quick Actions - Enhanced like trainer header */}
          <div className="hidden md:flex items-center ml-4 space-x-3">
            <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition-colors duration-200">
              <Clock size={16} />
              <span className="text-sm font-medium">Clock In</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-blue-200 px-4 py-2 rounded-lg transition-colors duration-200">
              <Calendar size={16} />
              <span className="text-sm font-medium">Request Leave</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-900 hover:bg-purple-800 text-purple-200 px-4 py-2 rounded-lg transition-colors duration-200">
              <FileText size={16} />
              <span className="text-sm font-medium">Submit Report</span>
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search employees, documents..."
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 w-80"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                <div className="absolute right-0 mt-2 w-96 bg-slate-800 rounded-lg shadow-lg border border-slate-600 z-20">
                  <div className="p-4 border-b border-slate-600">
                    <h3 className="text-lg font-semibold text-white">Employee Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-700 hover:bg-slate-700 cursor-pointer ${
                          notification.unread ? "bg-slate-700/50" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                              notification.type === "success"
                                ? "bg-green-500"
                                : notification.type === "action"
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-white">{notification.title}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  notification.type === "success"
                                    ? "bg-green-900 text-green-200"
                                    : notification.type === "action"
                                      ? "bg-orange-900 text-orange-200"
                                      : "bg-blue-900 text-blue-200"
                                }`}
                              >
                                {notification.type}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-slate-600">
                    <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <User size={16} className="text-slate-300" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">Software Developer</p>
              </div>
            </button>

            {/* User dropdown */}
            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-600 z-20">
                  <div className="py-1">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                      <User size={16} className="mr-3" />
                      My Profile
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Settings size={16} className="mr-3" />
                      Settings
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Award size={16} className="mr-3" />
                      My Achievements
                    </button>
                    <hr className="my-1 border-slate-600" />
                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300">
                      <LogOut size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default EmployeeHeader
