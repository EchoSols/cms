"use client"

import type React from "react"
import { useState } from "react"
import { ExternalLink, Globe, Plus, Edit, Trash2, Eye, Star, Search, Share, Bookmark } from "lucide-react"

interface ExternalResource {
  id: string
  title: string
  description: string
  url: string
  type: "Article" | "Video" | "Course" | "Tool" | "Documentation" | "Community"
  category: string
  tags: string[]
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  isBookmarked: boolean
  isFeatured: boolean
  lastVerified: string
  addedDate: string
  addedBy: string
  visitCount: number
}

const mockResources: ExternalResource[] = [
  {
    id: "1",
    title: "React Documentation",
    description: "Official React documentation with tutorials and API reference",
    url: "https://react.dev",
    type: "Documentation",
    category: "Programming",
    tags: ["React", "JavaScript", "Frontend"],
    language: "English",
    difficulty: "Beginner",
    rating: 4.9,
    isBookmarked: true,
    isFeatured: true,
    lastVerified: "2024-12-20",
    addedDate: "2024-12-15",
    addedBy: "Sarah Johnson",
    visitCount: 234,
  },
]

const ExternalResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ExternalResource[]>(mockResources)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">External Resources</h1>
          <p className="text-slate-300">Manage external learning links, tools, and references</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Type & Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                          {resource.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          {resource.isBookmarked && <Bookmark className="w-4 h-4 text-blue-400 fill-current" />}
                        </div>
                        <p className="text-sm text-slate-300 mt-1">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                          <span>Added by {resource.addedBy}</span>
                          <span>•</span>
                          <span>{resource.addedDate}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-900 text-blue-300 rounded">
                        {resource.category}
                      </span>
                      <div className="text-sm text-white">{resource.type}</div>
                      <span className="inline-block px-2 py-1 text-xs bg-green-900 text-green-300 rounded">
                        {resource.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button className="text-green-400 hover:text-green-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-purple-400 hover:text-purple-300">
                        <Share className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Globe className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No resources found</h3>
          <p className="mt-1 text-sm text-slate-300">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ExternalResourcesPage
