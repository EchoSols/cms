"use client";

import { useState } from "react";
import {
  FileText,
  Video,
  Image,
  File,
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Upload,
  HardDrive,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type:
    | "video"
    | "document"
    | "image"
    | "presentation"
    | "audio"
    | "interactive";
  category: string;
  tags: string[];
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  downloads: number;
  views: number;
  isPublic: boolean;
  fileUrl: string;
  thumbnail?: string;
}

const ContentLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const mockContent: ContentItem[] = [
    {
      id: "1",
      title: "Leadership Presentation Template",
      description:
        "Professional PowerPoint template for leadership training presentations with customizable slides and graphics.",
      type: "presentation",
      category: "Leadership Development",
      tags: ["leadership", "presentation", "template", "powerpoint"],
      fileSize: "2.4 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "Sarah Johnson",
      downloads: 156,
      views: 342,
      isPublic: true,
      fileUrl: "/content/leadership-template.pptx",
    },
    {
      id: "2",
      title: "Customer Service Training Video",
      description:
        "High-quality video demonstrating effective customer service techniques and best practices.",
      type: "video",
      category: "Customer Service",
      tags: ["customer service", "video", "training", "best practices"],
      fileSize: "45.2 MB",
      uploadDate: "2024-01-12",
      uploadedBy: "Lisa Rodriguez",
      downloads: 89,
      views: 234,
      isPublic: true,
      fileUrl: "/content/customer-service-video.mp4",
      thumbnail: "/thumbnails/customer-service.jpg",
    },
    {
      id: "3",
      title: "Technical Skills Assessment",
      description:
        "Comprehensive assessment template for evaluating technical skills across various domains.",
      type: "document",
      category: "Technical Skills",
      tags: ["assessment", "technical", "evaluation", "template"],
      fileSize: "1.8 MB",
      uploadDate: "2024-01-10",
      uploadedBy: "Mike Chen",
      downloads: 234,
      views: 567,
      isPublic: true,
      fileUrl: "/content/technical-assessment.docx",
    },
    {
      id: "4",
      title: "Sales Training Infographic",
      description:
        "Visual infographic covering key sales techniques and strategies for training purposes.",
      type: "image",
      category: "Sales Training",
      tags: ["sales", "infographic", "visual", "training"],
      fileSize: "3.1 MB",
      uploadDate: "2024-01-08",
      uploadedBy: "David Thompson",
      downloads: 178,
      views: 445,
      isPublic: true,
      fileUrl: "/content/sales-infographic.png",
    },
    {
      id: "5",
      title: "Compliance Training Audio",
      description:
        "Audio recording covering essential compliance topics and regulatory requirements.",
      type: "audio",
      category: "Compliance Training",
      tags: ["compliance", "audio", "regulations", "training"],
      fileSize: "28.7 MB",
      uploadDate: "2024-01-05",
      uploadedBy: "Robert Wilson",
      downloads: 67,
      views: 123,
      isPublic: false,
      fileUrl: "/content/compliance-audio.mp3",
    },
    {
      id: "6",
      title: "Interactive Learning Module",
      description:
        "HTML5 interactive module for hands-on learning experiences with embedded assessments.",
      type: "interactive",
      category: "Technical Skills",
      tags: ["interactive", "html5", "learning", "assessment"],
      fileSize: "15.3 MB",
      uploadDate: "2024-01-03",
      uploadedBy: "Jennifer Lee",
      downloads: 45,
      views: 89,
      isPublic: true,
      fileUrl: "/content/interactive-module.html",
    },
  ];

  const categories = [
    "All Categories",
    "Leadership Development",
    "Customer Service",
    "Technical Skills",
    "Sales Training",
    "Compliance Training",
    "Product Training",
    "Safety Training",
  ];
  const contentTypes = [
    "All Types",
    "video",
    "document",
    "image",
    "presentation",
    "audio",
    "interactive",
  ];

  const filteredContent = mockContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;
    const matchesType =
      selectedType === "" ||
      selectedType === "All Types" ||
      item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (itemId: string) => {
    console.log("Downloading item:", itemId);
    // Handle download logic
  };

  const handleView = (itemId: string) => {
    console.log("Viewing item:", itemId);
    // Handle view logic
  };

  const handleEdit = (itemId: string) => {
    console.log("Editing item:", itemId);
    // Handle edit logic
  };

  const handleDelete = (itemId: string) => {
    console.log("Deleting item:", itemId);
    // Handle delete logic
  };

  const handleBulkDownload = () => {
    console.log("Bulk downloading items:", selectedItems);
    // Handle bulk download logic
  };

  const handleBulkDelete = () => {
    console.log("Bulk deleting items:", selectedItems);
    // Handle bulk delete logic
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "document":
        return FileText;
      case "image":
        return Image;
      case "presentation":
        return File;
      case "audio":
        return File;
      case "interactive":
        return File;
      default:
        return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800";
      case "document":
        return "bg-blue-100 text-blue-800";
      case "image":
        return "bg-green-100 text-green-800";
      case "presentation":
        return "bg-purple-100 text-purple-800";
      case "audio":
        return "bg-yellow-100 text-yellow-800";
      case "interactive":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileSizeColor = (fileSize: string) => {
    const size = Number.parseFloat(fileSize.split(" ")[0]);
    if (size < 5) return "text-green-600";
    if (size < 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Content Library</h1>
        <p className="text-slate-300">
          Manage and organize your training content, materials, and resources
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">
                Total Content
              </p>
              <p className="text-2xl font-bold text-white">
                {mockContent.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-900 rounded-lg">
              <HardDrive className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Size</p>
              <p className="text-2xl font-bold text-white">
                {mockContent
                  .reduce((sum, item) => {
                    const size = Number.parseFloat(item.fileSize.split(" ")[0]);
                    return sum + size;
                  }, 0)
                  .toFixed(1)}{" "}
                MB
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900 rounded-lg">
              <Download className="w-6 h-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">
                Total Downloads
              </p>
              <p className="text-2xl font-bold text-white">
                {mockContent.reduce((sum, item) => sum + item.downloads, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-900 rounded-lg">
              <Eye className="w-6 h-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {mockContent.reduce((sum, item) => sum + item.views, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All Types"
                    ? "All Types"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex border border-slate-600 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300"
                } border-r border-slate-600`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">
                {selectedItems.length} items selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDownload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Selected
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <div
                key={item.id}
                className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:bg-slate-700 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                        {!item.isPublic && (
                          <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-medium text-white">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">File Size:</span>
                      <span
                        className={`font-medium ${getFileSizeColor(
                          item.fileSize
                        )}`}
                      >
                        {item.fileSize}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Downloads:</span>
                      <span className="font-medium text-white">
                        {item.downloads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Views:</span>
                      <span className="font-medium text-white">
                        {item.views}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>By {item.uploadedBy}</span>
                    <span>{formatDate(item.uploadDate)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(item.id)}
                      className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(item.id)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-md"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === filteredContent.length &&
                        filteredContent.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(
                            filteredContent.map((item) => item.id)
                          );
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {filteredContent.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <tr key={item.id} className="hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                              <TypeIcon className="w-5 h-5 text-slate-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {item.title}
                            </div>
                            <div className="text-sm text-slate-300 line-clamp-2 max-w-xs">
                              {item.description}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {item.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-200"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-xs text-slate-400">
                                  +{item.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <span className={getFileSizeColor(item.fileSize)}>
                          {item.fileSize}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {item.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(item.id)}
                            className="text-slate-400 hover:text-slate-300"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(item.id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-slate-400 hover:text-slate-300"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-white">
            No content found
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-8 bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-700 rounded-full flex items-center justify-center">
            <Upload className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-white">
            Upload New Content
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Drag and drop files here, or click to browse
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibraryPage;
