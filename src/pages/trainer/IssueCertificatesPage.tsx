"use client"

import { useState } from "react"
import { Search, Filter, Eye, Edit, Download, Award, Clock, User, CheckCircle, XCircle, Send } from "lucide-react"

interface Certificate {
  id: string
  learnerName: string
  programName: string
  completionDate: string
  issueDate: string
  status: "Pending" | "Issued" | "Expired" | "Revoked"
  certificateNumber: string
  validityPeriod: string
  score: number
  instructor: string
  programType: string
  level: string
  expiryDate: string
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    learnerName: "Sarah Johnson",
    programName: "Advanced Project Management",
    completionDate: "2024-01-15",
    issueDate: "2024-01-20",
    status: "Issued",
    certificateNumber: "CERT-2024-001",
    validityPeriod: "3 years",
    score: 92,
    instructor: "Dr. Michael Chen",
    programType: "Professional Certification",
    level: "Advanced",
    expiryDate: "2027-01-20",
  },
  {
    id: "2",
    learnerName: "David Rodriguez",
    programName: "Data Science Fundamentals",
    completionDate: "2024-01-10",
    issueDate: "2024-01-18",
    status: "Issued",
    certificateNumber: "CERT-2024-002",
    validityPeriod: "2 years",
    score: 88,
    instructor: "Prof. Lisa Wang",
    programType: "Technical Certification",
    level: "Intermediate",
    expiryDate: "2026-01-18",
  },
  {
    id: "3",
    learnerName: "Emily Chen",
    programName: "Leadership Excellence",
    completionDate: "2024-01-08",
    issueDate: "2024-01-15",
    status: "Issued",
    certificateNumber: "CERT-2024-003",
    validityPeriod: "5 years",
    score: 95,
    instructor: "Dr. Robert Smith",
    programType: "Leadership Certification",
    level: "Expert",
    expiryDate: "2029-01-15",
  },
  {
    id: "4",
    learnerName: "James Wilson",
    programName: "Cybersecurity Basics",
    completionDate: "2024-01-12",
    issueDate: "",
    status: "Pending",
    certificateNumber: "CERT-2024-004",
    validityPeriod: "2 years",
    score: 85,
    instructor: "Prof. Amanda Lee",
    programType: "Security Certification",
    level: "Beginner",
    expiryDate: "",
  },
  {
    id: "5",
    learnerName: "Maria Garcia",
    programName: "Digital Marketing Strategy",
    completionDate: "2024-01-05",
    issueDate: "2024-01-12",
    status: "Issued",
    certificateNumber: "CERT-2024-005",
    validityPeriod: "3 years",
    score: 90,
    instructor: "Dr. Kevin Brown",
    programType: "Marketing Certification",
    level: "Intermediate",
    expiryDate: "2027-01-12",
  },
]

const IssueCertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: certificates.length,
    pending: certificates.filter((c) => c.status === "Pending").length,
    issued: certificates.filter((c) => c.status === "Issued").length,
    expired: certificates.filter((c) => c.status === "Expired").length,
  }

  const handleIssueCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setShowIssueModal(true)
  }

  const confirmIssueCertificate = () => {
    if (selectedCertificate) {
      const today = new Date().toISOString().split("T")[0]
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 2) // Default 2 years

      setCertificates((prev) =>
        prev.map((cert) =>
          cert.id === selectedCertificate.id
            ? {
                ...cert,
                status: "Issued",
                issueDate: today,
                expiryDate: expiryDate.toISOString().split("T")[0],
              }
            : cert,
        ),
      )
      setShowIssueModal(false)
      setSelectedCertificate(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued":
        return "bg-green-900 text-green-200"
      case "Pending":
        return "bg-yellow-900 text-yellow-200"
      case "Expired":
        return "bg-red-900 text-red-200"
      case "Revoked":
        return "bg-slate-700 text-slate-200"
      default:
        return "bg-slate-700 text-slate-200"
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Issue Certificates</h1>
        <p className="text-slate-300">Manage and issue certificates for completed training programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Certificates</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-900 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Pending Issue</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Issued</p>
              <p className="text-2xl font-bold text-white">{stats.issued}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-900 rounded-lg">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Expired</p>
              <p className="text-2xl font-bold text-white">{stats.expired}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by learner name, program, or certificate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Issued">Issued</option>
              <option value="Expired">Expired</option>
              <option value="Revoked">Revoked</option>
            </select>

            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Learner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Completion Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Certificate Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredCertificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{certificate.learnerName}</div>
                        <div className="text-sm text-slate-300">{certificate.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{certificate.programName}</div>
                      <div className="text-sm text-slate-300">
                        {certificate.programType} • {certificate.level}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{certificate.completionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                      {certificate.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}
                    >
                      {certificate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{certificate.certificateNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {certificate.status === "Pending" && (
                        <button
                          onClick={() => handleIssueCertificate(certificate)}
                          className="text-primary-400 hover:text-primary-300 flex items-center"
                        >
                          <Award className="w-4 h-4 mr-1" />
                          Issue
                        </button>
                      )}

                      {certificate.status === "Issued" && (
                        <>
                          <button className="text-blue-400 hover:text-blue-300 flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                          <button className="text-green-400 hover:text-green-300 flex items-center">
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </button>
                        </>
                      )}

                      <button className="text-slate-400 hover:text-slate-300 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>

                      <button className="text-slate-400 hover:text-slate-300 flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Certificate Modal */}
      {showIssueModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Issue Certificate</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-300">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300">Learner:</p>
                <p className="font-medium text-white">{selectedCertificate.learnerName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-300">Program:</p>
                <p className="font-medium text-white">{selectedCertificate.programName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-300">Completion Score:</p>
                <p className="font-medium text-white">{selectedCertificate.score}%</p>
              </div>

              <div>
                <p className="text-sm text-slate-300">Certificate Number:</p>
                <p className="font-medium text-white">{selectedCertificate.certificateNumber}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmIssueCertificate}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Issue Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueCertificatesPage
