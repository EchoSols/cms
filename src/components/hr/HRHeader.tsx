"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, Settings, LogOut, Plus, FileText, UserPlus } from "lucide-react"

interface HRHeaderProps {
  onMenuClick: () => void
}

const HRHeader = ({ onMenuClick }: HRHeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "New employee onboarding",
      message: "Emma Wilson starts tomorrow - onboarding checklist ready",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      title: "Compliance alert",
      message: "5 employees need to complete mandatory training by Dec 15",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payroll reminder",
      message: "Monthly payroll processing due in 3 days",
      time: "4 hours ago",
      unread: true,
    },
    {
      id: 4,
      title: "Performance review cycle",
      message: "Q4 performance reviews are now open",
      time: "1 day ago",
      unread: false,
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

          {/* Quick Actions */}
          <div className="hidden md:flex items-center ml-4 space-x-3">
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <UserPlus size={16} />
              <span className="text-sm font-medium">Add Employee</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <Plus size={16} />
              <span className="text-sm font-medium">Job Posting</span>
            </button>
            <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <FileText size={16} />
              <span className="text-sm font-medium">Generate Report</span>
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
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-72"
              />
            </div>
          </div>

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
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-20">
                  <div className="p-4 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
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
                              notification.unread ? "bg-green-500" : "bg-slate-600"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-white">{notification.title}</p>
                            <p className="text-sm text-slate-300">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-slate-700">
                    <button className="w-full text-center text-green-400 hover:text-green-300 text-sm font-medium">
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
              className="flex items-center space-x-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">HR Specialist</p>
                <p className="text-xs text-slate-400">Human Resources</p>
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

export default HRHeader
