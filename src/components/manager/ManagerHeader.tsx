"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, Settings, LogOut, Plus, Users } from "lucide-react"

interface ManagerHeaderProps {
  onMenuClick: () => void
}

const ManagerHeader = ({ onMenuClick }: ManagerHeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "New leave request",
      message: "Sarah Chen requested 2 days leave for Dec 20-21",
      time: "30 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Performance review due",
      message: "3 team members have pending reviews",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Team meeting reminder",
      message: "Weekly team standup in 1 hour",
      time: "3 hours ago",
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
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <Plus size={16} />
              <span className="text-sm font-medium">Add Employee</span>
            </button>
            <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <Users size={16} />
              <span className="text-sm font-medium">Team Meeting</span>
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
                placeholder="Search team members..."
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
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
                              notification.unread ? "bg-blue-500" : "bg-slate-600"
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Mike Smith</p>
                <p className="text-xs text-slate-400">Engineering Manager</p>
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

export default ManagerHeader
