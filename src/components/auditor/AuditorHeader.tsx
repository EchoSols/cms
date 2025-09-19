"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, Settings, LogOut, Download, Shield, Eye } from "lucide-react"

interface AuditorHeaderProps {
  onMenuClick: () => void
}

const AuditorHeader = ({ onMenuClick }: AuditorHeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "Policy violation detected",
      message: "Unusual access pattern detected in payroll system",
      time: "10 minutes ago",
      unread: true,
      type: "critical",
    },
    {
      id: 2,
      title: "Document expiry alert",
      message: "15 employee contracts expire within 30 days",
      time: "1 hour ago",
      unread: true,
      type: "warning",
    },
    {
      id: 3,
      title: "Compliance report ready",
      message: "Monthly compliance report has been generated",
      time: "2 hours ago",
      unread: false,
      type: "info",
    },
    {
      id: 4,
      title: "Failed login attempts",
      message: "Multiple failed login attempts detected",
      time: "4 hours ago",
      unread: false,
      type: "warning",
    },
  ]

  return (
    <header className="bg-slate-900 shadow-sm border-b border-slate-700 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>

          {/* Read-Only Badge */}
          <div className="hidden md:flex items-center ml-4">
            <div className="flex items-center space-x-2 bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-3 py-1.5 rounded-lg">
              <Eye size={16} />
              <span className="text-sm font-medium">Read-Only Access</span>
            </div>
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
                placeholder="Search audit logs, documents..."
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-80"
              />
            </div>
          </div>

          {/* Quick Export */}
          <button className="hidden md:flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors duration-200">
            <Download size={16} />
            <span className="text-sm font-medium">Export Report</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                <div className="absolute right-0 mt-2 w-96 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-20">
                  <div className="p-4 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">Audit Alerts</h3>
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
                              notification.type === "critical"
                                ? "bg-red-500"
                                : notification.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-white">{notification.title}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  notification.type === "critical"
                                    ? "bg-red-900/50 text-red-300"
                                    : notification.type === "warning"
                                      ? "bg-yellow-900/50 text-yellow-300"
                                      : "bg-blue-900/50 text-blue-300"
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
                  <div className="p-4 border-t border-slate-700">
                    <button className="w-full text-center text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                      View all alerts
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
              className="flex items-center space-x-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Auditor</p>
                <p className="text-xs text-slate-400">Compliance Officer</p>
              </div>
            </button>

            {/* User dropdown */}
            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-20">
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
                      <Shield size={16} className="mr-3" />
                      Audit Settings
                    </button>
                    <hr className="my-1 border-slate-700" />
                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
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

export default AuditorHeader
