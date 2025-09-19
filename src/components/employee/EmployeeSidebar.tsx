"use client"

import { useState } from "react"
import {
  X,
  LayoutDashboard,
  User,
  Clock,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Briefcase,
  DollarSign,
  BookOpen,
  Award,
} from "lucide-react"

interface EmployeeSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const EmployeeSidebar = ({ isOpen, onClose }: EmployeeSidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: "Dashboard",
      href: "/employee",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "My Profile",
      href: "/employee/profile",
      icon: User,
      badge: null,
    },
    {
      name: "Time & Attendance",
      icon: Clock,
      children: [
        { name: "Time Tracking", href: "/employee/time-tracking" },
        { name: "My Attendance", href: "/employee/attendance" },
        { name: "Overtime Requests", href: "/employee/overtime" },
      ],
    },
    {
      name: "Leave Management",
      icon: Calendar,
      children: [
        { name: "Request Leave", href: "/employee/leave-request" },
        { name: "My Leave History", href: "/employee/leave-history" },
        { name: "Leave Balance", href: "/employee/leave-balance" },
      ],
    },
    {
      name: "Payroll & Benefits",
      icon: DollarSign,
      children: [
        { name: "Pay Stubs", href: "/employee/paystubs" },
        { name: "Tax Documents", href: "/employee/tax-docs" },
        { name: "Benefits Enrollment", href: "/employee/benefits" },
      ],
    },
    {
      name: "Performance",
      icon: BarChart3,
      children: [
        { name: "My Performance", href: "/employee/performance" },
        { name: "Goals & KPIs", href: "/employee/goals" },
        { name: "Feedback", href: "/employee/feedback" },
      ],
    },
    {
      name: "Learning & Development",
      icon: BookOpen,
      children: [
        { name: "Training Courses", href: "/employee/training" },
        { name: "Certifications", href: "/employee/certifications" },
        { name: "Skills Assessment", href: "/employee/skills" },
      ],
    },
    {
      name: "Documents",
      icon: FileText,
      children: [
        { name: "My Documents", href: "/employee/documents" },
        { name: "Company Policies", href: "/employee/policies" },
        { name: "Employee Handbook", href: "/employee/handbook" },
      ],
    },
    {
      name: "Career",
      icon: Award,
      children: [
        { name: "Internal Jobs", href: "/employee/internal-jobs" },
        { name: "Career Path", href: "/employee/career-path" },
        { name: "Mentorship", href: "/employee/mentorship" },
      ],
    },
    {
      name: "Directory",
      href: "/employee/directory",
      icon: Briefcase,
      badge: null,
    },
    {
      name: "Messages",
      icon: MessageSquare,
      href: "/employee/messages",
      badge: "2",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/employee/settings",
      badge: null,
    },
  ]

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName],
    )
  }

  const isActive = (href: string) => false // Since we don't have router context

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar - Updated to dark theme matching trainer style */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header - Updated header styling for dark theme */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HR Pro</h1>
              <p className="text-xs text-slate-400">Employee Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Updated navigation styling for dark theme */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {navigation.map((item) => {
            if (item.href) {
              // Single menu item
              return (
                <button
                  key={item.name}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive(item.href)
                        ? "bg-slate-800 text-white border-r-2 border-blue-500"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                  )}
                </button>
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
                        hasActiveChild
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
                        <button
                          key={child.name}
                          className={`
                            w-full text-left block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                            ${
                              isActive(child.href)
                                ? "bg-slate-700 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }
                          `}
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </nav>

        {/* Footer - Updated footer styling for dark theme */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center px-3 py-2 text-sm text-slate-300">
            <div className="w-8 h-8 bg-slate-700 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-medium text-slate-300">JD</span>
            </div>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-xs text-slate-400">john@company.com</p>
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

export default EmployeeSidebar
