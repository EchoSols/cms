"use client"

import { useState } from "react"
import { Search, Eye, Edit, Download, TrendingUp, Users, Target, BarChart3, Grid3x3, User, Award } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  importance: "Low" | "Medium" | "High" | "Critical"
  lastAssessed: string
  nextReview: string
}

interface Learner {
  id: string
  name: string
  department: string
  position: string
  skills: { skillId: string; level: string; score: number; lastUpdated: string }[]
  overallScore: number
  status: "Developing" | "Competent" | "Proficient" | "Expert"
}

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "Project Management",
    category: "Leadership",
    level: "Advanced",
    importance: "High",
    lastAssessed: "2024-01-15",
    nextReview: "2024-04-15",
  },
  {
    id: "2",
    name: "Data Analysis",
    category: "Technical",
    level: "Intermediate",
    importance: "High",
    lastAssessed: "2024-01-10",
    nextReview: "2024-04-10",
  },
  {
    id: "3",
    name: "Communication",
    category: "Soft Skills",
    level: "Expert",
    importance: "Critical",
    lastAssessed: "2024-01-20",
    nextReview: "2024-04-20",
  },
  {
    id: "4",
    name: "Problem Solving",
    category: "Analytical",
    level: "Advanced",
    importance: "High",
    lastAssessed: "2024-01-12",
    nextReview: "2024-04-12",
  },
  {
    id: "5",
    name: "Team Leadership",
    category: "Leadership",
    level: "Intermediate",
    importance: "Medium",
    lastAssessed: "2024-01-18",
    nextReview: "2024-04-18",
  },
]

const mockLearners: Learner[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    department: "Engineering",
    position: "Senior Developer",
    skills: [
      { skillId: "1", level: "Advanced", score: 85, lastUpdated: "2024-01-15" },
      { skillId: "2", level: "Expert", score: 92, lastUpdated: "2024-01-10" },
      { skillId: "3", level: "Advanced", score: 78, lastUpdated: "2024-01-20" },
    ],
    overallScore: 85,
    status: "Proficient",
  },
  {
    id: "2",
    name: "David Rodriguez",
    department: "Marketing",
    position: "Marketing Manager",
    skills: [
      { skillId: "1", level: "Expert", score: 95, lastUpdated: "2024-01-15" },
      { skillId: "3", level: "Expert", score: 90, lastUpdated: "2024-01-20" },
      { skillId: "5", level: "Advanced", score: 88, lastUpdated: "2024-01-18" },
    ],
    overallScore: 91,
    status: "Expert",
  },
  {
    id: "3",
    name: "Emily Chen",
    department: "Sales",
    position: "Sales Director",
    skills: [
      { skillId: "3", level: "Expert", score: 96, lastUpdated: "2024-01-20" },
      { skillId: "4", level: "Advanced", score: 82, lastUpdated: "2024-01-12" },
      { skillId: "5", level: "Intermediate", score: 75, lastUpdated: "2024-01-18" },
    ],
    overallScore: 84,
    status: "Proficient",
  },
]

const SkillMatrixPage = () => {
  const [selectedView, setSelectedView] = useState<"matrix" | "list">("matrix")
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [skillFilter, setSkillFilter] = useState("All")
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null)

  const filteredLearners = mockLearners.filter((learner) => {
    const matchesSearch =
      learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "All" || learner.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-gray-100 text-gray-800"
      case "Intermediate":
        return "bg-blue-100 text-blue-800"
      case "Advanced":
        return "bg-green-100 text-green-800"
      case "Expert":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Developing":
        return "bg-yellow-100 text-yellow-800"
      case "Competent":
        return "bg-blue-100 text-blue-800"
      case "Proficient":
        return "bg-green-100 text-green-800"
      case "Expert":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Skill Matrix</h1>
        <p className="text-slate-300">View and manage skill matrices for learners and teams</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Learners</p>
              <p className="text-2xl font-bold text-white">{mockLearners.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Skills</p>
              <p className="text-2xl font-bold text-white">{mockSkills.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Expert Level</p>
              <p className="text-2xl font-bold text-white">
                {mockLearners.filter((l) => l.status === "Expert").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Avg Score</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(mockLearners.reduce((acc, l) => acc + l.overallScore, 0) / mockLearners.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedView("matrix")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedView === "matrix" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Grid3x3 className="w-4 h-4 inline mr-2" />
              Matrix View
            </button>
            <button
              onClick={() => setSelectedView("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedView === "list" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              List View
            </button>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search learners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="All">All Skills</option>
              {mockSkills.map((skill) => (
                <option key={skill.id} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matrix View */}
      {selectedView === "matrix" && (
        <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Learner
                  </th>
                  {mockSkills.map((skill) => (
                    <th
                      key={skill.id}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                    >
                      <div className="text-center">
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-xs text-slate-400">{skill.category}</div>
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {filteredLearners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{learner.name}</div>
                          <div className="text-sm text-slate-400">{learner.position}</div>
                          <div className="text-xs text-slate-500">{learner.department}</div>
                        </div>
                      </div>
                    </td>

                    {mockSkills.map((skill) => {
                      const learnerSkill = learner.skills.find((s) => s.skillId === skill.id)
                      return (
                        <td key={skill.id} className="px-6 py-4 whitespace-nowrap text-center">
                          {learnerSkill ? (
                            <div className="space-y-1">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSkillLevelColor(learnerSkill.level)}`}
                              >
                                {learnerSkill.level}
                              </span>
                              <div className={`text-sm font-medium ${getScoreColor(learnerSkill.score)}`}>
                                {learnerSkill.score}%
                              </div>
                              <div className="text-xs text-slate-400">{learnerSkill.lastUpdated}</div>
                            </div>
                          ) : (
                            <div className="text-slate-500 text-sm">Not assessed</div>
                          )}
                        </td>
                      )
                    })}

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(learner.overallScore)}`}>
                          {learner.overallScore}%
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(learner.status)}`}
                        >
                          {learner.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* List View */}
      {selectedView === "list" && (
        <div className="space-y-6">
          {filteredLearners.map((learner) => (
            <div key={learner.id} className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{learner.name}</h3>
                    <p className="text-slate-400">
                      {learner.position} • {learner.department}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(learner.overallScore)}`}>
                    {learner.overallScore}%
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(learner.status)}`}
                  >
                    {learner.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learner.skills.map((skill) => {
                  const skillInfo = mockSkills.find((s) => s.id === skill.skillId)
                  return (
                    <div key={skill.skillId} className="border border-slate-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{skillInfo?.name}</h4>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Score:</span>
                          <span className={`font-medium ${getScoreColor(skill.score)}`}>{skill.score}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Last Updated:</span>
                          <span className="text-white">{skill.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Skills
                </button>
                <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-300 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Overview */}
      <div className="mt-8 bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Skills Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSkills.map((skill) => (
            <div key={skill.id} className="border border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{skill.name}</h4>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}
                >
                  {skill.level}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white">{skill.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Importance:</span>
                  <span className="text-white">{skill.importance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Review:</span>
                  <span className="text-white">{skill.nextReview}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillMatrixPage
