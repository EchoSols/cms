"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  X,
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  CheckSquare,
  FileText,
  Video,
  MessageSquare,
  User,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

interface TrainerSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavigationItem {
  name: string
  icon: any
  href?: string
  badge?: string | null
  children?: { name: string; href: string }[]
}

const TrainerSidebar = ({ isOpen, onClose }: TrainerSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/trainer",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Training Programs",
      icon: BookOpen,
      badge: null,
      children: [
        { name: "All Programs", href: "/trainer/programs" },
        { name: "Create Program", href: "/trainer/create-program" },
        { name: "Program Templates", href: "/trainer/templates" },
        { name: "Archived Programs", href: "/trainer/archived" },
      ],
    },
    {
      name: "Course Management",
      icon: Video,
      badge: null,
      children: [
        { name: "All Courses", href: "/trainer/courses" },
        { name: "Create Course", href: "/trainer/create-course" },
        { name: "Content Library", href: "/trainer/content-library" },
        { name: "Course Categories", href: "/trainer/categories" },
        { name: "Learning Paths", href: "/trainer/learning-paths" },
      ],
    },
    {
      name: "Learner Management",
      icon: Users,
      badge: null,
      children: [
        { name: "All Learners", href: "/trainer/learners" },
        { name: "Enrollment Management", href: "/trainer/enrollments" },
        { name: "Learning Groups", href: "/trainer/groups" },
        { name: "Individual Progress", href: "/trainer/individual-progress" },
        { name: "Skill Assessments", href: "/trainer/assessments" },
      ],
    },
    {
      name: "Assessments & Quizzes",
      icon: CheckSquare,
      badge: null,
      children: [
        { name: "Create Assessment", href: "/trainer/create-assessment" },
        { name: "Question Bank", href: "/trainer/question-bank" },
        { name: "Quiz Results", href: "/trainer/quiz-results" },
        { name: "Grading & Feedback", href: "/trainer/grading" },
        { name: "Certification Tests", href: "/trainer/certification-tests" },
      ],
    },
    {
      name: "Certifications",
      icon: Award,
      badge: null,
      children: [
        { name: "Certification Programs", href: "/trainer/certifications" },
        { name: "Issue Certificates", href: "/trainer/issue-certificates" },
        { name: "Certificate Templates", href: "/trainer/certificate-templates" },
        { name: "Verification System", href: "/trainer/verification" },
        { name: "Renewal Management", href: "/trainer/renewals" },
      ],
    },
    {
      name: "Skill Development",
      icon: TrendingUp,
      badge: null,
      children: [
        { name: "Skill Matrix", href: "/trainer/skill-matrix" },
        { name: "Competency Framework", href: "/trainer/competency" },
        { name: "Skill Gap Analysis", href: "/trainer/skill-gaps" },
        { name: "Career Development", href: "/trainer/career-development" },
        { name: "Personal Development Plans", href: "/trainer/pdp" },
      ],
    },
    {
      name: "Schedule & Sessions",
      icon: Calendar,
      badge: null,
      children: [
        { name: "Training Calendar", href: "/trainer/calendar" },
        { name: "Live Sessions", href: "/trainer/live-sessions" },
        { name: "Webinar Management", href: "/trainer/webinars" },
        { name: "Room Booking", href: "/trainer/room-booking" },
        { name: "Instructor Schedule", href: "/trainer/instructor-schedule" },
      ],
    },
    {
      name: "Analytics & Reports",
      icon: BarChart3,
      badge: null,
      children: [
        { name: "Training Dashboard", href: "/trainer/analytics" },
        { name: "Completion Reports", href: "/trainer/completion-reports" },
        { name: "Effectiveness Analysis", href: "/trainer/effectiveness" },
        { name: "ROI Analysis", href: "/trainer/roi-analysis" },
        { name: "Custom Reports", href: "/trainer/custom-reports" },
      ],
    },
    {
      name: "Resources & Materials",
      icon: FileText,
      badge: null,
      children: [
        { name: "Resource Library", href: "/trainer/resources" },
        { name: "Upload Materials", href: "/trainer/upload-materials" },
        { name: "Document Management", href: "/trainer/documents" },
        { name: "External Resources", href: "/trainer/external-resources" },
      ],
    },
    {
      name: "AI Training Recommendations",
      icon: Lightbulb,
      badge: null,
      children: [
        { name: "Personalized Recommendations", href: "/trainer/ai-recommendations" },
        { name: "Learning Analytics", href: "/trainer/learning-analytics" },
        { name: "Performance Predictions", href: "/trainer/predictions" },
        { name: "Adaptive Learning", href: "/trainer/adaptive-learning" },
      ],
    },
    {
      name: "Communication",
      icon: MessageSquare,
      badge: null,
      children: [
        { name: "Announcements", href: "/trainer/announcements" },
        { name: "Discussion Forums", href: "/trainer/forums" },
        { name: "Learner Feedback", href: "/trainer/feedback" },
        { name: "Instructor Messages", href: "/trainer/messages" },
      ],
    },
    {
      name: "My Profile",
      href: "/trainer/profile",
      icon: User,
      badge: null,
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/trainer/settings",
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
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HR Pro</h1>
              <p className="text-xs text-slate-400">Trainer Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-slate-800 rounded text-white">
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
                        ? "bg-primary-600 text-white border-r-2 border-primary-400"
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
                        hasActiveChild
                          ? "bg-primary-600 text-white"
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
                            block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                            ${
                              isActive(child.href)
                                ? "bg-primary-500 text-white"
                                : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
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
              <span className="text-xs font-medium text-white">TR</span>
            </div>
            <div>
              <p className="font-medium text-white">Training Manager</p>
              <p className="text-xs text-slate-400">trainer@company.com</p>
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

export default TrainerSidebar
