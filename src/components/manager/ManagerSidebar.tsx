"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Clock,
  Award,
  TrendingUp,
  ClipboardList,
  User,
} from "lucide-react"

interface ManagerSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const ManagerSidebar = ({ isOpen, onClose }: ManagerSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: "Dashboard",
      href: "/manager",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "My Team",
      icon: Users,
      children: [
        { name: "Team Overview", href: "/manager/team" },
        { name: "Team Directory", href: "/manager/team-directory" },
        { name: "Team Performance", href: "/manager/team-performance" },
        { name: "Team Schedule", href: "/manager/team-schedule" },
      ],
    },
    {
      name: "Time & Attendance",
      icon: Clock,
      children: [
        { name: "Team Attendance", href: "/manager/attendance" },
        { name: "Leave Requests", href: "/manager/leave-requests" },
        { name: "Overtime Approvals", href: "/manager/overtime" },
        { name: "Time Reports", href: "/manager/time-reports" },
      ],
    },
    {
      name: "Performance Management",
      icon: BarChart3,
      children: [
        { name: "Performance Reviews", href: "/manager/performance-reviews" },
        { name: "Goal Management", href: "/manager/goals" },
        { name: "Feedback & 1:1s", href: "/manager/feedback" },
        { name: "Team Metrics", href: "/manager/metrics" },
      ],
    },
    {
      name: "Recruitment",
      icon: UserCheck,
      children: [
        { name: "Open Positions", href: "/manager/positions" },
        { name: "Interview Schedule", href: "/manager/interviews" },
        { name: "Candidate Reviews", href: "/manager/candidates" },
        { name: "Hiring Pipeline", href: "/manager/hiring-pipeline" },
      ],
    },
    {
      name: "Projects & Tasks",
      icon: ClipboardList,
      children: [
        { name: "Project Overview", href: "/manager/projects" },
        { name: "Task Assignment", href: "/manager/tasks" },
        { name: "Project Timeline", href: "/manager/timeline" },
        { name: "Resource Planning", href: "/manager/resources" },
      ],
    },
    {
      name: "Reports & Analytics",
      icon: TrendingUp,
      children: [
        { name: "Team Reports", href: "/manager/reports" },
        { name: "Performance Analytics", href: "/manager/analytics" },
        { name: "Budget & Costs", href: "/manager/budget" },
        { name: "Productivity Metrics", href: "/manager/productivity" },
      ],
    },
    {
      name: "Learning & Development",
      icon: Award,
      children: [
        { name: "Training Plans", href: "/manager/training-plans" },
        { name: "Skill Development", href: "/manager/skill-development" },
        { name: "Career Planning", href: "/manager/career-planning" },
        { name: "Mentorship Program", href: "/manager/mentorship" },
      ],
    },
    {
      name: "Calendar",
      href: "/manager/calendar",
      icon: Calendar,
      badge: null,
    },
    {
      name: "Messages",
      icon: MessageSquare,
      href: "/manager/messages",
      badge: "5",
    },
    {
      name: "My Profile",
      href: "/manager/profile",
      icon: User,
      badge: null,
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/manager/settings",
      badge: null,
    },
  ]

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName],
    )
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HR Pro</h1>
              <p className="text-xs text-slate-400">Manager Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {navigation.map((item) => {
            if (item.href) {
              // Single menu item
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive(item.href)
                        ? "bg-blue-600 text-white border-r-2 border-blue-400"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                  )}
                </Link>
              )
            } else {
              // Menu with children
              const isExpanded = expandedMenus.includes(item.name)
              const hasActiveChild = item.children?.some((child) => isActive(child.href))

              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${
                        hasActiveChild ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                            ${
                              isActive(child.href)
                                ? "bg-blue-500 text-white"
                                : "text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                            }
                          `}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center px-3 py-2 text-sm text-slate-300">
            <div className="w-8 h-8 bg-slate-700 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-medium text-slate-300">MS</span>
            </div>
            <div>
              <p className="font-medium text-white">Mike Smith</p>
              <p className="text-xs text-slate-400">Team Manager</p>
            </div>
          </div>
          <button className="w-full mt-3 flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200">
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

export default ManagerSidebar
