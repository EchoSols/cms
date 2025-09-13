"use client"

import { useState } from "react"
import { FileText, Plus, Search, Eye, Edit, Trash2, Download, FolderOpen } from "lucide-react"

interface Document {
  id: string
  title: string
  fileName: string
  type: string
  size: string
  category: string
  tags: string[]
  uploadDate: string
  uploader: string
  downloads: number
  status: "Active" | "Archived" | "Draft"
  version: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Training Program Guidelines",
    fileName: "training_guidelines_v2.1.pdf",
    type: "PDF",
    size: "1.2 MB",
    category: "Guidelines",
    tags: ["guidelines", "training", "programs"],
    uploadDate: "2024-01-15",
    uploader: "John Smith",
    downloads: 23,
    status: "Active",
    version: "2.1",
  },
  {
    id: "2",
    title: "Course Assessment Template",
    fileName: "assessment_template.docx",
    type: "DOCX",
    size: "0.8 MB",
    category: "Templates",
    tags: ["assessment", "template", "course"],
    uploadDate: "2024-01-10",
    uploader: "Jane Doe",
    downloads: 45,
    status: "Active",
    version: "1.0",
  },
  {
    id: "3",
    title: "Learning Path Documentation",
    fileName: "learning_paths.pdf",
    type: "PDF",
    size: "2.5 MB",
    category: "Documentation",
    tags: ["learning", "paths", "documentation"],
    uploadDate: "2024-01-20",
    uploader: "Mike Wilson",
    downloads: 18,
    status: "Active",
    version: "1.2",
  },
]

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || doc.category === categoryFilter
    const matchesStatus = statusFilter === "All" || doc.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300"
      case "Draft":
        return "bg-yellow-900 text-yellow-300"
      case "Archived":
        return "bg-slate-700 text-slate-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-900 text-red-300"
      case "DOCX":
        return "bg-blue-900 text-blue-300"
      case "XLSX":
        return "bg-green-900 text-green-300"
      case "PPTX":
        return "bg-orange-900 text-orange-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-slate-300">Manage training documents and materials</p>
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Document
          </button>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Categories</option>
              <option value="Guidelines">Guidelines</option>
              <option value="Templates">Templates</option>
              <option value="Documentation">Documentation</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-slate-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{doc.title}</div>
                        <div className="text-sm text-slate-300">{doc.fileName}</div>
                        <div className="text-xs text-slate-400">v{doc.version}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{doc.category}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}
                    >
                      {doc.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{doc.size}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{doc.uploadDate}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-white">
                      <Download className="w-4 h-4 mr-1 text-slate-400" />
                      {doc.downloads}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-300">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-300">
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

      {/* Upload Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Upload Document</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-300">
                <span className="sr-only">Close</span>
                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 text-sm">×</span>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option value="">Select category</option>
                  <option value="Guidelines">Guidelines</option>
                  <option value="Templates">Templates</option>
                  <option value="Documentation">Documentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">File</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                  <FolderOpen className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-blue-400 hover:text-blue-300">Upload a file</span>
                      <span className="text-slate-300"> or drag and drop</span>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </div>
                  <p className="text-xs text-slate-400">PDF, DOCX, XLSX up to 10MB</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsPage
