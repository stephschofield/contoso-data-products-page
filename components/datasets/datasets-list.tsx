import Image from "next/image"
import { MoreVertical, Lock, FileSpreadsheet, BarChart, PieChart, Database, FileText, FileCode } from "lucide-react"
import Link from "next/link"

export function DatasetsList() {
  const datasets = [
    {
      id: 1,
      title: "Intellectual Engagement",
      author: "Waqar Ali",
      updatedDays: 8,
      usability: 10.0,
      size: "153 KB",
      type: "tabular",
      typeLabel: "Tabular Data",
      icons: ["excel", "chart"],
      downloads: 16,
      isPrivate: true,
      isRestricted: true,
      image: "/images/student-demographics.jpeg",
    },
    {
      id: 2,
      title: "Career Readiness",
      author: "Pushpil Katibol",
      updatedDays: 11,
      usability: 7.1,
      size: "2 MB",
      type: "relational",
      typeLabel: "Relational",
      icons: ["excel", "pie", "database"],
      downloads: 18,
      isPrivate: false,
      isRestricted: false,
      image: "/images/alumni-careers.jpeg",
    },
    {
      id: 3,
      title: "Academic Success",
      author: "Hari Gopikha",
      updatedDays: 16,
      usability: 8.9,
      size: "598 KB",
      type: "analytics",
      typeLabel: "Analytics",
      icons: ["excel", "database", "chart"],
      downloads: 15,
      isPrivate: true,
      isRestricted: true,
      image: "/images/student-success.jpeg",
    },
    {
      id: 4,
      title: "Chatbots' Impact on University Learning",
      author: "Joseph Demeo",
      updatedDays: 9,
      usability: 9.4,
      size: "484 KB",
      type: "visualization",
      typeLabel: "Visualization",
      icons: ["excel", "pie", "chart"],
      downloads: 9,
      isPrivate: false,
      isRestricted: false,
      image: "/images/course-enrollment.jpeg",
    },
    {
      id: 5,
      title: "Student Enrollment Patterns",
      author: "Maria Rodriguez",
      updatedDays: 5,
      usability: 8.7,
      size: "1.2 MB",
      type: "documents",
      typeLabel: "Documents",
      icons: ["document"],
      downloads: 23,
      isPrivate: false,
      isRestricted: true,
      image: "/images/enrollment-analytics.jpeg",
    },
    {
      id: 6,
      title: "Campus Resource Utilization",
      author: "David Chen",
      updatedDays: 3,
      usability: 9.2,
      size: "876 KB",
      type: "raw",
      typeLabel: "Raw Data",
      icons: ["code", "database"],
      downloads: 7,
      isPrivate: true,
      isRestricted: true,
      image: "/images/campus-resource-utilization.jpeg",
    },
    {
      id: 7,
      title: "Faculty Research Output",
      author: "Sarah Johnson",
      updatedDays: 12,
      usability: 8.5,
      size: "3.4 MB",
      type: "analytics",
      typeLabel: "Analytics",
      icons: ["chart", "pie"],
      downloads: 31,
      isPrivate: false,
      isRestricted: false,
      image: "/images/powerbi-thumbnail.jpeg",
    },
    {
      id: 8,
      title: "Library Resource Usage",
      author: "Michael Brown",
      updatedDays: 7,
      usability: 7.8,
      size: "1.7 MB",
      type: "tabular",
      typeLabel: "Tabular Data",
      icons: ["excel", "database"],
      downloads: 14,
      isPrivate: true,
      isRestricted: true,
      image: "/images/library-resource-usage.jpeg",
    },
  ]

  const getTypeColor = (type) => {
    const colors = {
      tabular: "bg-green-100 text-green-600",
      relational: "bg-blue-100 text-blue-600",
      analytics: "bg-purple-100 text-purple-600",
      visualization: "bg-yellow-100 text-yellow-600",
      documents: "bg-red-100 text-red-600",
      raw: "bg-gray-100 text-gray-600",
    }
    return colors[type] || "bg-gray-100 text-gray-600"
  }

  const getTypeIcon = (type) => {
    const icons = {
      tabular: <FileSpreadsheet className="h-3.5 w-3.5" />,
      relational: <Database className="h-3.5 w-3.5" />,
      analytics: <BarChart className="h-3.5 w-3.5" />,
      visualization: <PieChart className="h-3.5 w-3.5" />,
      documents: <FileText className="h-3.5 w-3.5" />,
      raw: <FileCode className="h-3.5 w-3.5" />,
    }
    return icons[type] || <Database className="h-3.5 w-3.5" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-40">
            <Image src={dataset.image || "/placeholder.svg"} alt={dataset.title} fill className="object-cover" />
            <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-md ${getTypeColor(dataset.type)}`}>
              <div className="flex items-center gap-1">
                {getTypeIcon(dataset.type)}
                <span className="text-xs font-medium">{dataset.typeLabel}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg line-clamp-1">{dataset.title}</h3>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{dataset.author}</span>
                <span>Updated {dataset.updatedDays} days ago</span>
              </div>

              <div className="flex justify-between mt-1">
                <div className="flex items-center gap-1">
                  <span>Usability {dataset.usability}</span>
                </div>
                <span>{dataset.size}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex space-x-1">
                {dataset.icons.includes("excel") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-green-600" />
                  </div>
                )}
                {dataset.icons.includes("pie") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                    <PieChart className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                )}
                {dataset.icons.includes("chart") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full">
                    <BarChart className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                )}
                {dataset.icons.includes("database") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-yellow-100 rounded-full">
                    <Database className="h-3.5 w-3.5 text-yellow-600" />
                  </div>
                )}
                {dataset.icons.includes("document") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full">
                    <FileText className="h-3.5 w-3.5 text-red-600" />
                  </div>
                )}
                {dataset.icons.includes("code") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <FileCode className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="text-xs">-</span>
                  <span className="text-sm">{dataset.downloads}</span>
                </div>

                {dataset.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/datasets/${dataset.id}`}
                className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium ${
                  dataset.isRestricted
                    ? "bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 hover:text-amber-800"
                    : "bg-contoso-blue hover:bg-contoso-blue/90 text-white"
                }`}
              >
                {dataset.isRestricted ? "Request Access" : "Access Now"}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
