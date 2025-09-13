"use client"

import { useState } from "react"
import { Plus, Search, Eye, Edit, Trash2, Download } from "lucide-react"

interface Certification {
  id: string
  name: string
  description: string
  category: string
  duration: string
  validity: string
  status: "Active" | "Draft" | "Archived"
  participants: number
  completionRate: number
}

interface Certificate {
  id: string
  learnerName: string
  certificationName: string
  issueDate: string
  expiryDate: string
  status: "Valid" | "Expired" | "Expiring Soon"
  score: number
}

const mockCertifications: Certification[] = [
  {
    id: "1",
    name: "Project Management Professional (PMP)",
    description: "Advanced project management certification",
    category: "Project Management",
    duration: "6 months",
    validity: "3 years",
    status: "Active",
    participants: 25,
    completionRate: 80,
  },
  {
    id: "2",
    name: "Certified Scrum Master (CSM)",
    description: "Agile methodology certification",
    category: "Agile Development",
    duration: "3 months",
    validity: "2 years",
    status: "Active",
    participants: 40,
    completionRate: 90,
  },
]

const mockCertificates: Certificate[] = [
  {
    id: "1",
    learnerName: "Sarah Johnson",
    certificationName: "Project Management Professional (PMP)",
    issueDate: "2024-01-15",
    expiryDate: "2027-01-15",
    status: "Valid",
    score: 92,
  },
  {
    id: "2",
    learnerName: "David Rodriguez",
    certificationName: "Certified Scrum Master (CSM)",
    issueDate: "2023-11-20",
    expiryDate: "2025-11-20",
    status: "Valid",
    score: 88,
  },
]

const CertificationsPage = () => {
  const [selectedView, setSelectedView] = useState<"programs" | "certificates">("programs")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertifications = mockCertifications.filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCertificates = mockCertificates.filter((cert) =>
    cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300"
      case "Valid":
        return "bg-green-900 text-green-300"
      case "Draft":
        return "bg-yellow-900 text-yellow-300"
      case "Archived":
        return "bg-slate-700 text-slate-300"
      case "Expired":
        return "bg-red-900 text-red-300"
      case "Expiring Soon":
        return "bg-orange-900 text-orange-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Certifications</h1>
        <p className="text-slate-300">Manage certification programs and issued certificates</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-700 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView("programs")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === "programs" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Certification Programs
          </button>
          <button
            onClick={() => setSelectedView("certificates")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === "certificates"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Issued Certificates
          </button>
        </div>
      </div>

      {selectedView === "programs" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Program
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-6">
                <h3 className="text-lg font-medium text-white mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-300 mb-3">{cert.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                    <span className="text-sm text-slate-400">{cert.category}</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Duration: {cert.duration} • Validity: {cert.validity}
                  </div>
                  <div className="text-sm text-slate-300">
                    {cert.participants} participants • {cert.completionRate}% completion
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm text-slate-300 hover:text-white flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-2 text-sm text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === "certificates" && (
        <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Issued Certificates</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Learner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Certification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Issue Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 text-sm font-medium text-white">{cert.learnerName}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{cert.certificationName}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{cert.issueDate}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{cert.expiryDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{cert.score}%</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-slate-300 hover:text-white">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-slate-300 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificationsPage
