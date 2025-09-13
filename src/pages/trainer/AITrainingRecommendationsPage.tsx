"use client"

import type React from "react"
import { useState } from "react"
import { Lightbulb, TrendingUp, Users, BookOpen, Target, Star, ArrowRight, Search, Brain, Zap } from "lucide-react"

interface AIRecommendation {
  id: string
  learnerName: string
  currentRole: string
  skillGaps: string[]
  recommendedPrograms: string[]
  confidence: number
  estimatedImpact: "High" | "Medium" | "Low"
  priority: "High" | "Medium" | "Low"
  lastUpdated: string
}

interface RecommendationInsight {
  id: string
  type: "skill-gap" | "career-path" | "performance" | "trend"
  title: string
  description: string
  learnersAffected: number
  impact: string
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    learnerName: "Alex Johnson",
    currentRole: "Software Developer",
    skillGaps: ["Machine Learning", "Data Analysis", "Cloud Architecture"],
    recommendedPrograms: ["AI Fundamentals", "Data Science Bootcamp", "AWS Certification"],
    confidence: 92,
    estimatedImpact: "High",
    priority: "High",
    lastUpdated: "2024-12-20",
  },
  {
    id: "2",
    learnerName: "Sarah Chen",
    currentRole: "Project Manager",
    skillGaps: ["Agile Methodologies", "Stakeholder Management", "Risk Assessment"],
    recommendedPrograms: ["Agile Scrum Master", "Advanced Project Management", "Risk Management"],
    confidence: 88,
    estimatedImpact: "High",
    priority: "High",
    lastUpdated: "2024-12-19",
  },
  {
    id: "3",
    learnerName: "Mike Rodriguez",
    currentRole: "Marketing Specialist",
    skillGaps: ["Digital Marketing", "Analytics", "Content Strategy"],
    recommendedPrograms: ["Digital Marketing Mastery", "Google Analytics", "Content Marketing"],
    confidence: 85,
    estimatedImpact: "Medium",
    priority: "Medium",
    lastUpdated: "2024-12-18",
  },
]

const mockInsights: RecommendationInsight[] = [
  {
    id: "1",
    type: "skill-gap",
    title: "AI & Machine Learning Skills Gap",
    description: "47% of developers lack foundational AI/ML skills needed for current projects",
    learnersAffected: 23,
    impact: "High - Project delays and technical debt",
  },
  {
    id: "2",
    type: "career-path",
    title: "Leadership Development Opportunity",
    description: "12 mid-level managers show high potential for senior leadership roles",
    learnersAffected: 12,
    impact: "Medium - Succession planning and retention",
  },
  {
    id: "3",
    type: "performance",
    title: "Agile Methodology Adoption",
    description: "Teams using Agile practices show 34% higher project success rates",
    learnersAffected: 18,
    impact: "High - Improved project outcomes",
  },
]

const AITrainingRecommendationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [impactFilter, setImpactFilter] = useState<string>("all")
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null)

  const filteredRecommendations = mockRecommendations.filter((rec) => {
    const matchesSearch =
      rec.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || rec.priority === priorityFilter
    const matchesImpact = impactFilter === "all" || rec.estimatedImpact === impactFilter

    return matchesSearch && matchesPriority && matchesImpact
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-900 text-red-300"
      case "Medium":
        return "bg-yellow-900 text-yellow-300"
      case "Low":
        return "bg-green-900 text-green-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-900 text-red-300"
      case "Medium":
        return "bg-yellow-900 text-yellow-300"
      case "Low":
        return "bg-green-900 text-green-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "skill-gap":
        return <Target className="w-5 h-5" />
      case "career-path":
        return <TrendingUp className="w-5 h-5" />
      case "performance":
        return <Star className="w-5 h-5" />
      case "trend":
        return <Zap className="w-5 h-5" />
      default:
        return <Lightbulb className="w-5 h-5" />
    }
  }

  const stats = {
    totalLearners: 156,
    recommendationsGenerated: 89,
    highPriority: mockRecommendations.filter((r) => r.priority === "High").length,
    avgConfidence: Math.round(
      mockRecommendations.reduce((sum, r) => sum + r.confidence, 0) / mockRecommendations.length,
    ),
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Training Recommendations</h1>
          <p className="text-slate-300">AI-powered personalized training suggestions for your learners</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Generate New Recommendations
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Learners</p>
              <p className="text-2xl font-bold text-white">{stats.totalLearners}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Recommendations</p>
              <p className="text-2xl font-bold text-white">{stats.recommendationsGenerated}</p>
            </div>
            <Lightbulb className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">High Priority</p>
              <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
            </div>
            <Target className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Avg Confidence</p>
              <p className="text-2xl font-bold text-green-400">{stats.avgConfidence}%</p>
            </div>
            <Star className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 text-blue-400 mr-2" />
              AI Insights
            </h3>
            <div className="space-y-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1 text-slate-300">{getInsightIcon(insight.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{insight.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-400">{insight.learnersAffected} learners</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${insight.impact.includes("High") ? "bg-red-900 text-red-300" : insight.impact.includes("Medium") ? "bg-yellow-900 text-yellow-300" : "bg-green-900 text-green-300"}`}
                        >
                          {insight.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700">
            <div className="p-4 border-b border-slate-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search learners or roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="all">All Priorities</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <select
                    value={impactFilter}
                    onChange={(e) => setImpactFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="all">All Impacts</option>
                    <option value="High">High Impact</option>
                    <option value="Medium">Medium Impact</option>
                    <option value="Low">Low Impact</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {filteredRecommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border border-slate-600 rounded-lg p-4 hover:bg-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{recommendation.learnerName}</h4>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(recommendation.priority)}`}
                          >
                            {recommendation.priority} Priority
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(recommendation.estimatedImpact)}`}
                          >
                            {recommendation.estimatedImpact} Impact
                          </span>
                        </div>

                        <p className="text-sm text-slate-300 mb-3">{recommendation.currentRole}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-white mb-2">Skill Gaps Identified</h5>
                            <div className="flex flex-wrap gap-2">
                              {recommendation.skillGaps.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-red-900 text-red-300 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-white mb-2">Recommended Programs</h5>
                            <div className="space-y-1">
                              {recommendation.recommendedPrograms.map((program, index) => (
                                <div key={index} className="flex items-center text-sm text-blue-400">
                                  <BookOpen className="w-3 h-3 mr-2" />
                                  {program}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <div className="text-sm text-slate-400 mb-2">Confidence</div>
                        <div className="text-2xl font-bold text-green-400">{recommendation.confidence}%</div>
                        <div className="text-xs text-slate-500 mt-1">Updated {recommendation.lastUpdated}</div>
                        <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Model Status */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI Model Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-green-900/20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-300">Model Status</p>
              <p className="text-xs text-green-400">Active & Learning</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-900/20 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-blue-300">Last Training</p>
              <p className="text-xs text-blue-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-purple-900/20 rounded-lg">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-purple-300">Accuracy</p>
              <p className="text-xs text-purple-400">94.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITrainingRecommendationsPage
