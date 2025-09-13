"use client"

import type React from "react"
import { useState } from "react"
import {
  FolderOpen,
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Share,
  Star,
  Users,
  FolderPlus,
  Archive,
  Tag,
} from "lucide-react"

interface Document {
  id: string
  title: string
  description: string
  fileName: string
  fileType: string
  fileSize: string
  category: string
  tags: string[]
  uploadDate: string
  lastModified: string
  uploader: string
  downloads: number
  isPublic: boolean
  isArchived: boolean
  isFeatured: boolean
  version: string
}

interface DocumentCategory {
  id: string
  name: string
  description: string
  documentCount: number
  icon: string
  color: string
}

const mockCategories: DocumentCategory[] = [
  {
    id: "1",
    name: "Project Management",
    description: "Project planning, execution, and monitoring documents",
    documentCount: 24,
    icon: "📊",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "2",
    name: "Agile Development",
    description: "Agile methodologies, Scrum guides, and templates",
    documentCount: 18,
    icon: "🔄",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    name: "Data Analysis",
    description: "Data analysis tools, techniques, and examples",
    documentCount: 32,
    icon: "📈",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "4",
    name: "Leadership",
    description: "Leadership development materials and guides",
    documentCount: 15,
    icon: "👥",
    color: "bg-yellow-100 text-yellow-800",
  },
]

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Project Charter Template",
    description: "Comprehensive project charter template with stakeholder analysis and risk assessment sections",
    fileName: "project_charter_template.docx",
    fileType: "Word",
    fileSize: "2.4 MB",
    category: "Project Management",
    tags: ["Template", "Project Charter", "Stakeholder Analysis", "Risk Assessment"],
    uploadDate: "2024-12-20",
    lastModified: "2024-12-20",
    uploader: "Sarah Johnson",
    downloads: 156,
    isPublic: true,
    isArchived: false,
    isFeatured: true,
    version: "2.1",
  },
  {
    id: "2",
    title: "Agile Sprint Planning Guide",
    description: "Step-by-step guide for effective sprint planning in Agile development",
    fileName: "agile_sprint_planning.pdf",
    fileType: "PDF",
    fileSize: "1.8 MB",
    category: "Agile Development",
    tags: ["Agile", "Sprint Planning", "Guide", "Best Practices"],
    uploadDate: "2024-12-19",
    lastModified: "2024-12-19",
    uploader: "Sarah Johnson",
    downloads: 89,
    isPublic: true,
    isArchived: false,
    isFeatured: false,
    version: "1.0",
  },
  {
    id: "3",
    title: "Data Visualization Best Practices",
    description: "Comprehensive guide to creating effective data visualizations and charts",
    fileName: "data_visualization_guide.pdf",
    fileType: "PDF",
    fileSize: "3.2 MB",
    category: "Data Analysis",
    tags: ["Data Visualization", "Charts", "Best Practices", "Design"],
    uploadDate: "2024-12-18",
    lastModified: "2024-12-18",
    uploader: "Sarah Johnson",
    downloads: 234,
    isPublic: true,
    isArchived: false,
    isFeatured: true,
    version: "1.5",
  },
]

const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showCreateFolder, setShowCreateFolder] = useState(false)

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || document.category === categoryFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "archived" && document.isArchived) ||
      (statusFilter === "active" && !document.isArchived)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />
      case "word":
      case "docx":
      case "doc":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "excel":
      case "xlsx":
      case "xls":
        return <FileText className="w-5 h-5 text-green-600" />
      case "powerpoint":
      case "pptx":
      case "ppt":
        return <FileText className="w-5 h-5 text-orange-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (isArchived: boolean) => {
    return isArchived ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
  }

  const stats = {
    totalDocuments: documents.length,
    activeDocuments: documents.filter((doc) => !doc.isArchived).length,
    archivedDocuments: documents.filter((doc) => doc.isArchived).length,
    featuredDocuments: documents.filter((doc) => doc.isFeatured).length,
    totalDownloads: documents.reduce((sum, doc) => sum + doc.downloads, 0),
  }

  const archiveDocument = (id: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isArchived: !doc.isArchived } : doc)))
  }

  const toggleFeatured = (id: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isFeatured: !doc.isFeatured } : doc)))
  }

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Document Management</h1>
          <p className="text-slate-300">Organize and manage training documents and materials</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateFolder(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Documents</p>
              <p className="text-2xl font-bold text-white">{stats.totalDocuments}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Active</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeDocuments}</p>
            </div>
            <FolderOpen className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Archived</p>
              <p className="text-2xl font-bold text-slate-400">{stats.archivedDocuments}</p>
            </div>
            <Archive className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Featured</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.featuredDocuments}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Downloads</p>
              <p className="text-2xl font-bold text-purple-400">{stats.totalDownloads}</p>
            </div>
            <Download className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Document Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <div key={category.id} className="border border-slate-600 rounded-lg p-4 hover:bg-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="font-medium text-white">{category.name}</h4>
              </div>
              <p className="text-sm text-slate-300 mb-3">{category.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{category.documentCount} documents</span>
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
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Category & Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  File Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status & Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{getFileTypeIcon(document.fileType)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white">{document.title}</h4>
                          {document.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                        <p className="text-sm text-slate-300 mt-1 line-clamp-2">{document.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                          <span>v{document.version}</span>
                          <span>•</span>
                          <span>By {document.uploader}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${mockCategories.find((c) => c.name === document.category)?.color || "bg-slate-600 text-slate-200"}`}
                      >
                        {document.category}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {document.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {document.tags.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs bg-slate-600 text-slate-200 rounded">
                            +{document.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      <div className="font-medium">{document.fileName}</div>
                      <div className="text-slate-300">
                        <div>Size: {document.fileSize}</div>
                        <div>Type: {document.fileType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${document.isArchived ? "bg-slate-600 text-slate-200" : "bg-green-900 text-green-200"}`}
                      >
                        {document.isArchived ? "Archived" : "Active"}
                      </span>
                      <div className="text-sm text-white">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {document.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {document.isPublic ? "Public" : "Private"}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Modified: {document.lastModified}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedDocument(document)}
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
                      <button
                        onClick={() => toggleFeatured(document.id)}
                        className={`${document.isFeatured ? "text-yellow-400" : "text-slate-500"} hover:text-yellow-400`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => archiveDocument(document.id)}
                        className="text-slate-400 hover:text-slate-300"
                      >
                        <Archive className="w-4 h-4" />
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

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">No documents found</h3>
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
                <p className="text-sm text-slate-300">Download multiple documents at once</p>
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
                <p className="text-sm text-slate-300">Share a collection of documents</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Bulk Tag</h4>
                <p className="text-sm text-slate-300">Apply tags to multiple documents</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentManagementPage
