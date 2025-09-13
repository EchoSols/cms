"use client";

import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Star,
  FileText,
  Video,
  ImageIcon,
  Link,
} from "lucide-react";

interface TrainingResource {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "image" | "link" | "presentation";
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  downloads: number;
  rating: number;
  status: "active" | "archived" | "draft";
}

const mockResources: TrainingResource[] = [
  {
    id: "1",
    title: "Introduction to React Fundamentals",
    description:
      "Comprehensive guide covering React basics, components, and state management",
    type: "document",
    category: "Frontend Development",
    tags: ["React", "JavaScript", "Frontend"],
    author: "John Smith",
    createdAt: "2024-01-15",
    downloads: 1250,
    rating: 4.8,
    status: "active",
  },
  {
    id: "2",
    title: "Advanced CSS Techniques",
    description:
      "Video tutorial covering CSS Grid, Flexbox, and modern layout techniques",
    type: "video",
    category: "Frontend Development",
    tags: ["CSS", "Grid", "Flexbox"],
    author: "Sarah Johnson",
    createdAt: "2024-01-10",
    downloads: 890,
    rating: 4.6,
    status: "active",
  },
];

const resourceCategories = [
  "All Categories",
  "Frontend Development",
  "Backend Development",
  "Design",
  "Project Management",
];

const ResourcesPage = () => {
  const [resources, setResources] = useState<TrainingResource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "video":
        return <Video className="w-5 h-5 text-red-500" />;
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />;
      case "link":
        return <Link className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Resources</h1>
          <p className="text-slate-300">
            Manage and organize training materials and resources
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div className="ml-3">
              <p className="text-sm text-slate-300">Total Resources</p>
              <p className="text-2xl font-bold text-white">
                {resources.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <Download className="w-8 h-8 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-slate-300">Total Downloads</p>
              <p className="text-2xl font-bold text-white">
                {resources.reduce(
                  (sum, resource) => sum + resource.downloads,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-slate-300">Avg Rating</p>
              <p className="text-2xl font-bold text-white">
                {(
                  resources.reduce(
                    (sum, resource) => sum + resource.rating,
                    0
                  ) / resources.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6">
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
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {resourceCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Rating
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
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTypeIcon(resource.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">
                          {resource.title}
                        </div>
                        <div className="text-sm text-slate-300">
                          {resource.description}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {resource.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-200">
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {resource.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {resource.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {resource.downloads}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-white">
                        {resource.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        resource.status
                      )}`}
                    >
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
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
    </div>
  );
};

export default ResourcesPage;
