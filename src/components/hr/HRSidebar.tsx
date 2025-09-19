"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  X,
  LayoutDashboard,
  Users,
  UserPlus,
  DollarSign,
  Clock,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronDown,
  TrendingUp,
  Building,
  User,
  Database,
} from "lucide-react"

interface HRSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const HRSidebar = ({ isOpen, onClose }: HRSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: "Dashboard",
      href: "/hr",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Employee Management",
      icon: Users,
      children: [
        { name: "All Employees", href: "/hr/employees" },
        { name: "Employee Onboarding", href: "/hr/onboarding" },
        { name: "Employee Directory", href: "/hr/directory" },
        { name: "Organization Chart", href: "/hr/org-chart" },
        { name: "Employee Analytics", href: "/hr/employee-analytics" },
      ],
    },
    {
      name: "Recruitment & Hiring",
      icon: UserPlus,
      children: [
        { name: "Job Postings", href: "/hr/jobs" },
        { name: "Candidate Management", href: "/hr/candidates" },
        { name: "Interview Scheduling", href: "/hr/interviews" },
        { name: "Hiring Pipeline", href: "/hr/pipeline" },
        { name: "Talent Pool", href: "/hr/talent-pool" },
      ],
    },
    {
      name: "Payroll & Compensation",
      icon: DollarSign,
      children: [
        { name: "Payroll Processing", href: "/hr/payroll" },
        { name: "Salary Management", href: "/hr/salaries" },
        { name: "Benefits Administration", href: "/hr/benefits" },
        { name: "Tax Management", href: "/hr/tax-management" },
        { name: "Compensation Analytics", href: "/hr/compensation-analytics" },
      ],
    },
    {
      name: "Time & Attendance",
      icon: Clock,
      children: [
        { name: "Time Tracking Overview", href: "/hr/time-tracking" },
        { name: "Attendance Management", href: "/hr/attendance" },
        { name: "Leave Management", href: "/hr/leave" },
        { name: "Overtime Management", href: "/hr/overtime" },
        { name: "Schedule Management", href: "/hr/schedules" },
      ],
    },
    {
      name: "Performance & Learning",
      icon: BarChart3,
      children: [
        { name: "Performance Reviews", href: "/hr/performance" },
        { name: "Goal Management", href: "/hr/goals" },
        { name: "Training Programs", href: "/hr/training" },
        { name: "Skill Management", href: "/hr/skills" },
        { name: "Career Development", href: "/hr/career-development" },
      ],
    },
    {
      name: "Organization & Structure",
      icon: Building,
      children: [
        { name: "Departments", href: "/hr/departments" },
        { name: "Positions & Roles", href: "/hr/positions" },
        { name: "Reporting Structure", href: "/hr/reporting" },
        { name: "Location Management", href: "/hr/locations" },
        { name: "Cost Centers", href: "/hr/cost-centers" },
      ],
    },
    {
      name: "Documents & Compliance",
      icon: FileText,
      children: [
        { name: "Document Library", href: "/hr/documents" },
        { name: "HR Policies", href: "/hr/policies" },
        { name: "Compliance Overview", href: "/hr/compliance" },
        { name: "Audit Management", href: "/hr/audit" },
        { name: "Legal Requirements", href: "/hr/legal" },
      ],
    },
    {
      name: "Analytics & Reports",
      icon: TrendingUp,
      children: [
        { name: "Custom Reports", href: "/hr/reports" },
        { name: "Workforce Analytics", href: "/hr/workforce-analytics" },
        { name: "Performance Analytics", href: "/hr/performance-analytics" },
        { name: "Learning Analytics", href: "/hr/learning-analytics" },
        { name: "Executive Reports", href: "/hr/executive-reports" },
      ],
    },
    {
      name: "System Administration",
      icon: Database,
      children: [
        { name: "User Management", href: "/hr/user-management" },
        { name: "Role & Permissions", href: "/hr/roles" },
        { name: "System Settings", href: "/hr/system-settings" },
        { name: "Data Management", href: "/hr/data-management" },
        { name: "Integration Settings", href: "/hr/integrations" },
      ],
    },
    {
      name: "Calendar",
      href: "/hr/calendar",
      icon: Calendar,
      badge: null,
    },
    {
      name: "Messages",
      icon: MessageSquare,
      href: "/hr/messages",
      badge: "8",
    },
    {
      name: "My Profile",
      href: "/hr/profile",
      icon: User,
      badge: null,
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/hr/settings",
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
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HR Pro</h1>
              <p className="text-xs text-slate-400">HR Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {navigation.map((item) => {
            if (item.href) {
              // Single menu item
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
                    ${
                      isActive(item.href)
                        ? "bg-green-600 text-white border-r-2 border-green-400"
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleMenu(item.name)
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
                      ${
                        hasActiveChild
                          ? "bg-green-600 text-white"
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
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
                            ${
                              isActive(child.href)
                                ? "bg-green-500 text-white"
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

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center px-3 py-2 text-sm text-slate-300">
            <div className="w-8 h-8 bg-slate-700 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-medium text-slate-300">HR</span>
            </div>
            <div>
              <p className="font-medium text-white">HR Specialist</p>
              <p className="text-xs text-slate-400">hr@company.com</p>
            </div>
          </div>
          <button className="w-full mt-3 flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1">
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

export default HRSidebar
