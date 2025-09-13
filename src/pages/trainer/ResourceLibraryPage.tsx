"use client"

import type React from "react"
import { useState } from "react"
import {
  BookOpen,
  FileText,
  Video,
  ImageIcon,
  Download,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share,
  Star,
  Users,
  FolderOpen,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "Document" | "Video" | "Image" | "Presentation" | "Template" | "Guide"
  category: string
  tags: string[]
  fileSize: string
  uploadDate: string
  lastModified: string
  uploader: string
  downloads: number
  rating: number
  isPublic: boolean
  isFeatured: boolean
}

interface ResourceCategory {
  id: string
  name: string
  description: string
  resourceCount: number
  icon: string
}

const mockCategories: ResourceCategory[] = [
  {
    id: "1",
    name: "Project Management",
    description: "Templates, guides, and resources for project management",
    resourceCount: 24,
    icon: "📊",
  },
  {
    id: "2",
    name: "Agile Development",
    description: "Agile methodologies, Scrum guides, and templates",
    resourceCount: 18,
    icon: "🔄",
  },
  {
    id: "3",
    name: "Data Analysis",
    description: "Data analysis tools, techniques, and examples",
    resourceCount: 32,
    icon: "📈",
  },
  {
    id: "4",
    name: "Leadership",
    description: "Leadership development materials and guides",
    resourceCount: 15,
    icon: "👥",
  },
]

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Project Charter Template",
    description: "Comprehensive project charter template with stakeholder analysis and risk assessment sections",
    type: "Template",
    category: "Project Management",
    tags: ["Template", "Project Charter", "Stakeholder Analysis", "Risk Assessment"],
    fileSize: "2.4 MB",
    uploadDate: "2024-12-20",
    lastModified: "2024-12-20",
    uploader: "Sarah Johnson",
    downloads: 156,
    rating: 4.8,
    isPublic: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Agile Sprint Planning Guide",
    description: "Step-by-step guide for effective sprint planning in Agile development",
    type: "Guide",
    category: "Agile Development",
    tags: ["Agile", "Sprint Planning", "Guide", "Best Practices"],
    fileSize: "1.8 MB",
    uploadDate: "2024-12-19",
    lastModified: "2024-12-19",
    uploader: "Sarah Johnson",
    downloads: 89,
    rating: 4.6,
    isPublic: true,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Data Visualization Best Practices",
    description: "Comprehensive guide to creating effective data visualizations and charts",
    type: "Guide",
    category: "Data Analysis",
    tags: ["Data Visualization", "Charts", "Best Practices", "Design"],
    fileSize: "3.2 MB",
    uploadDate: "2024-12-18",
    lastModified: "2024-12-18",
    uploader: "Sarah Johnson",
    downloads: 234,
    rating: 4.9,
    isPublic: true,
    isFeatured: true,
  },
]

const ResourceLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter

    return matchesSearch && matchesType && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Document":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "Video":
        return <Video className="w-5 h-5 text-red-600" />
      case "Image":
        return <ImageIcon className="w-5 h-5 text-green-600" />
      case "Presentation":
        return <BookOpen className="w-5 h-5 text-purple-600" />
      case "Template":
        return <FileText className="w-5 h-5 text-orange-600" />
      case "Guide":
        return <BookOpen className="w-5 h-5 text-indigo-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Document":
        return "bg-blue-900 text-blue-200"
      case "Video":
        return "bg-red-900 text-red-200"
      case "Image":
        return "bg-green-900 text-green-200"
      case "Presentation":
        return "bg-purple-900 text-purple-200"
      case "Template":
        return "bg-orange-900 text-orange-200"
      case "Guide":
        return "bg-indigo-900 text-indigo-200"
      default:
        return "bg-gray-900 text-gray-200"
    }
  }

  const stats = {
    totalResources: mockResources.length,
    totalDownloads: mockResources.reduce((sum, resource) => sum + resource.downloads, 0),
    featuredResources: mockResources.filter((resource) => resource.isFeatured).length,
    publicResources: mockResources.filter((resource) => resource.isPublic).length,
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Resource Library</h1>
          <p className="text-slate-300">Manage and organize training materials and resources</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Resource
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Resources</p>
              <p className="text-2xl font-bold text-white">{stats.totalResources}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Downloads</p>
              <p className="text-2xl font-bold text-green-400">{stats.totalDownloads}</p>
            </div>
            <Download className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Featured</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.featuredResources}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Public</p>
              <p className="text-2xl font-bold text-purple-400">{stats.publicResources}</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Resource Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <div key={category.id} className="border border-slate-600 rounded-lg p-4 hover:bg-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="font-medium text-white">{category.name}</h4>
              </div>
              <p className="text-sm text-slate-300 mb-3">{category.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{category.resourceCount} resources</span>
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Presentation">Presentation</option>
              <option value="Template">Template</option>
              <option value="Guide">Guide</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {mockCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
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
                  Upload Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Stats
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
                      <div className="flex-shrink-0">{getTypeIcon(resource.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                          {resource.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                        <p className="text-sm text-slate-300 mt-1 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {resource.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded">
                              +{resource.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(resource.type)}`}
                      >
                        {resource.type}
                      </span>
                      <div className="text-sm text-white">{resource.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      <div className="font-medium">{resource.uploader}</div>
                      <div className="text-slate-300">
                        <div>Size: {resource.fileSize}</div>
                        <div>Uploaded: {resource.uploadDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {resource.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {resource.rating}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Modified: {resource.lastModified}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
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
          <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No resources found</h3>
          <p className="mt-1 text-sm text-slate-300">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Bulk Download</h4>
                <p className="text-sm text-slate-300">Download multiple resources at once</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center">
                <Share className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Share Collection</h4>
                <p className="text-sm text-slate-300">Share a collection of resources</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Featured Resources</h4>
                <p className="text-sm text-slate-300">Manage featured resource selection</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceLibraryPage
