"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Shield,
  FileText,
  User,
  Download,
  Send,
  RefreshCw,
  BarChart3,
  Settings,
} from "lucide-react"

interface VerificationRequest {
  id: string
  certificateNumber: string
  learnerName: string
  programName: string
  issueDate: string
  requestDate: string
  requesterName: string
  requesterEmail: string
  requesterOrganization: string
  status: "Pending" | "Verified" | "Rejected" | "Expired"
  verificationMethod: "Email" | "Phone" | "Online" | "Manual"
  responseTime: string
  notes: string
  priority: "Low" | "Medium" | "High" | "Urgent"
}

const mockVerificationRequests: VerificationRequest[] = [
  {
    id: "1",
    certificateNumber: "CERT-2024-001",
    learnerName: "Sarah Johnson",
    programName: "Advanced Project Management",
    issueDate: "2024-01-20",
    requestDate: "2024-01-25",
    requesterName: "John Smith",
    requesterEmail: "john.smith@company.com",
    requesterOrganization: "Tech Solutions Inc.",
    status: "Verified",
    verificationMethod: "Email",
    responseTime: "2 hours",
    notes: "Certificate verified successfully. All details match our records.",
    priority: "Medium",
  },
  {
    id: "2",
    certificateNumber: "CERT-2024-002",
    learnerName: "David Rodriguez",
    programName: "Data Science Fundamentals",
    issueDate: "2024-01-18",
    requestDate: "2024-01-26",
    requesterName: "Maria Garcia",
    requesterEmail: "maria.garcia@hr.com",
    requesterOrganization: "HR Solutions Ltd.",
    status: "Pending",
    verificationMethod: "Online",
    responseTime: "",
    notes: "Awaiting verification review by instructor.",
    priority: "High",
  },
  {
    id: "3",
    certificateNumber: "CERT-2024-003",
    learnerName: "Emily Chen",
    programName: "Leadership Excellence",
    issueDate: "2024-01-15",
    requestDate: "2024-01-24",
    requesterName: "Robert Wilson",
    requesterEmail: "robert.wilson@consulting.com",
    requesterOrganization: "Leadership Consulting Group",
    status: "Verified",
    verificationMethod: "Phone",
    responseTime: "1 hour",
    notes: "Verified via phone call. Certificate is authentic.",
    priority: "Urgent",
  },
  {
    id: "4",
    certificateNumber: "CERT-2024-004",
    learnerName: "James Wilson",
    programName: "Cybersecurity Basics",
    issueDate: "2024-01-22",
    requestDate: "2024-01-27",
    requesterName: "Lisa Brown",
    requesterEmail: "lisa.brown@security.com",
    requesterOrganization: "Security First Corp.",
    status: "Rejected",
    verificationMethod: "Email",
    responseTime: "4 hours",
    notes: "Certificate number not found in our system. Possible forgery.",
    priority: "High",
  },
  {
    id: "5",
    certificateNumber: "CERT-2024-005",
    learnerName: "Maria Garcia",
    programName: "Digital Marketing Strategy",
    issueDate: "2024-01-12",
    requestDate: "2024-01-23",
    requesterName: "Kevin Lee",
    requesterEmail: "kevin.lee@marketing.com",
    requesterOrganization: "Marketing Pro Agency",
    status: "Expired",
    verificationMethod: "Manual",
    responseTime: "6 hours",
    notes: "Certificate has expired. Learner needs to renew.",
    priority: "Low",
  },
]

const VerificationSystemPage = () => {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(mockVerificationRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)

  const filteredRequests = verificationRequests.filter((request) => {
    const matchesSearch =
      request.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requesterOrganization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || request.status === statusFilter
    const matchesPriority = priorityFilter === "All" || request.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: verificationRequests.length,
    pending: verificationRequests.filter((r) => r.status === "Pending").length,
    verified: verificationRequests.filter((r) => r.status === "Verified").length,
    rejected: verificationRequests.filter((r) => r.status === "Rejected").length,
    expired: verificationRequests.filter((r) => r.status === "Expired").length,
  }

  const handleVerifyRequest = (request: VerificationRequest) => {
    setSelectedRequest(request)
    setShowVerificationModal(true)
  }

  const confirmVerification = (status: "Verified" | "Rejected", notes: string) => {
    if (selectedRequest) {
      const responseTime = "2 hours" // Mock response time

      setVerificationRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status,
                notes,
                responseTime,
              }
            : req,
        ),
      )
      setShowVerificationModal(false)
      setSelectedRequest(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-900 text-white"
      case "Pending":
        return "bg-yellow-900 text-white"
      case "Rejected":
        return "bg-red-900 text-white"
      case "Expired":
        return "bg-slate-700 text-white"
      default:
        return "bg-slate-700 text-white"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-900 text-white"
      case "High":
        return "bg-orange-900 text-white"
      case "Medium":
        return "bg-yellow-900 text-white"
      case "Low":
        return "bg-green-900 text-white"
      default:
        return "bg-slate-700 text-white"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Email":
        return <FileText className="w-4 h-4 text-white" />
      case "Phone":
        return <User className="w-4 h-4 text-white" />
      case "Online":
        return <Shield className="w-4 h-4 text-white" />
      case "Manual":
        return <FileText className="w-4 h-4 text-white" />
      default:
        return <FileText className="w-4 h-4 text-white" />
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Certificate Verification System</h1>
        <p className="text-slate-300">
          Manage and process certificate verification requests from employers and organizations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Requests</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-900 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Pending</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Verified</p>
              <p className="text-2xl font-bold text-white">{stats.verified}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-900 rounded-lg">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Rejected</p>
              <p className="text-2xl font-bold text-white">{stats.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-slate-700 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-slate-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Expired</p>
              <p className="text-2xl font-bold text-white">{stats.expired}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </button>
          <button className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by certificate number, learner name, or requester..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verification Requests Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Certificate Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Requester Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{request.certificateNumber}</div>
                      <div className="text-sm text-slate-300">{request.learnerName}</div>
                      <div className="text-sm text-slate-300">{request.programName}</div>
                      <div className="text-xs text-slate-400">Issued: {request.issueDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{request.requesterName}</div>
                      <div className="text-sm text-slate-300">{request.requesterEmail}</div>
                      <div className="text-sm text-slate-300">{request.requesterOrganization}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(request.verificationMethod)}
                      <span className="ml-2 text-sm text-white">{request.verificationMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                    >
                      {request.status}
                    </span>
                    {request.responseTime && (
                      <div className="text-xs text-slate-400 mt-1">Response: {request.responseTime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {request.status === "Pending" && (
                        <button
                          onClick={() => handleVerifyRequest(request)}
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </button>
                      )}

                      <button className="text-blue-400 hover:text-blue-300 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>

                      <button className="text-green-400 hover:text-green-300 flex items-center">
                        <Send className="w-4 h-4 mr-1" />
                        Respond
                      </button>

                      {request.status === "Verified" && (
                        <button className="text-slate-400 hover:text-slate-300 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Verify Certificate</h3>
              <button onClick={() => setShowVerificationModal(false)} className="text-slate-400 hover:text-slate-300">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Certificate Number:</p>
                  <p className="font-medium text-white">{selectedRequest.certificateNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Learner:</p>
                  <p className="font-medium text-white">{selectedRequest.learnerName}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Program:</p>
                  <p className="font-medium text-white">{selectedRequest.programName}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Issue Date:</p>
                  <p className="font-medium text-white">{selectedRequest.issueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400">Requester:</p>
                <p className="font-medium text-white">
                  {selectedRequest.requesterName} ({selectedRequest.requesterOrganization})
                </p>
                <p className="text-sm text-slate-300">{selectedRequest.requesterEmail}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Verification Notes:</label>
                <textarea
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter verification notes..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmVerification("Rejected", "Certificate verification failed")}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => confirmVerification("Verified", "Certificate verified successfully")}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationSystemPage
