"use client";

import type React from "react";
import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  BarChart3,
  Users,
  Calendar,
} from "lucide-react";

interface CustomReport {
  id: string;
  name: string;
  type: "Training" | "Learner" | "Performance" | "Financial" | "Custom";
  description: string;
  lastGenerated: string;
  status: "Active" | "Draft" | "Archived";
  schedule: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Manual";
  recipients: string[];
}

const mockReports: CustomReport[] = [
  {
    id: "1",
    name: "Monthly Training Summary",
    type: "Training",
    description: "Comprehensive monthly overview of all training activities",
    lastGenerated: "2024-12-01",
    status: "Active",
    schedule: "Monthly",
    recipients: ["hr@company.com", "managers@company.com"],
  },
  {
    id: "2",
    name: "Learner Progress Report",
    type: "Learner",
    description: "Individual learner progress and completion rates",
    lastGenerated: "2024-12-15",
    status: "Active",
    schedule: "Weekly",
    recipients: ["trainers@company.com"],
  },
  {
    id: "3",
    name: "Training ROI Analysis",
    type: "Financial",
    description: "Return on investment analysis for training programs",
    lastGenerated: "2024-11-30",
    status: "Active",
    schedule: "Quarterly",
    recipients: ["executives@company.com", "finance@company.com"],
  },
];

const CustomReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<CustomReport | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-200";
      case "Draft":
        return "bg-yellow-900 text-yellow-200";
      case "Archived":
        return "bg-slate-700 text-slate-300";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Training":
        return <BarChart3 className="w-4 h-4" />;
      case "Learner":
        return <Users className="w-4 h-4" />;
      case "Performance":
        return <BarChart3 className="w-4 h-4" />;
      case "Financial":
        return <FileText className="w-4 h-4" />;
      case "Custom":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const stats = {
    total: mockReports.length,
    active: mockReports.filter((r) => r.status === "Active").length,
    draft: mockReports.filter((r) => r.status === "Draft").length,
    scheduled: mockReports.filter((r) => r.schedule !== "Manual").length,
  };

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Custom Reports</h1>
          <p className="text-slate-300">
            Create and manage custom training reports
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Reports</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Active Reports</p>
              <p className="text-2xl font-bold text-green-400">
                {stats.active}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Draft Reports</p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.draft}
              </p>
            </div>
            <Edit className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Scheduled</p>
              <p className="text-2xl font-bold text-purple-400">
                {stats.scheduled}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Types</option>
              <option value="Training">Training</option>
              <option value="Learner">Learner</option>
              <option value="Performance">Performance</option>
              <option value="Financial">Financial</option>
              <option value="Custom">Custom</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Last Generated
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
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {report.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {report.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center mr-2">
                        {getTypeIcon(report.type)}
                      </div>
                      <span className="text-sm text-white">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {report.schedule}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {report.lastGenerated}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setShowDetails(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
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

      {/* Report Details Modal */}
      {showDetails && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Report Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Report Name
                  </label>
                  <p className="mt-1 text-sm text-white">
                    {selectedReport.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Type
                  </label>
                  <p className="mt-1 text-sm text-white">
                    {selectedReport.type}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedReport.status
                    )}`}
                  >
                    {selectedReport.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Schedule
                  </label>
                  <p className="mt-1 text-sm text-white">
                    {selectedReport.schedule}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Description
                </label>
                <p className="mt-1 text-sm text-white">
                  {selectedReport.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Recipients
                </label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedReport.recipients.map((recipient, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded border border-blue-800"
                    >
                      {recipient}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Last Generated
                </label>
                <p className="mt-1 text-sm text-white">
                  {selectedReport.lastGenerated}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-slate-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Create Custom Report
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Report Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                    placeholder="Enter report name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Type
                  </label>
                  <select className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                    <option>Select type</option>
                    <option>Training</option>
                    <option>Learner</option>
                    <option>Performance</option>
                    <option>Financial</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Schedule
                  </label>
                  <select className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                    <option>Select schedule</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Manual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  placeholder="Enter report description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReportsPage;
