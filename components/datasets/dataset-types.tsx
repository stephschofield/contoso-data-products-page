import { FileSpreadsheet, Database, BarChart, PieChart, FileText, FileCode } from "lucide-react"
import Link from "next/link"

export function DatasetTypes() {
  const datasetTypes = [
    {
      id: "tabular",
      name: "Tabular Data",
      description: "Structured data in tables with rows and columns",
      icon: <FileSpreadsheet className="h-8 w-8 text-green-600" />,
      count: 124,
      color: "bg-green-100",
    },
    {
      id: "relational",
      name: "Relational",
      description: "Data with relationships between multiple tables",
      icon: <Database className="h-8 w-8 text-blue-600" />,
      count: 87,
      color: "bg-blue-100",
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Pre-processed data optimized for analysis",
      icon: <BarChart className="h-8 w-8 text-purple-600" />,
      count: 56,
      color: "bg-purple-100",
    },
    {
      id: "visualization",
      name: "Visualization",
      description: "Data prepared for charts and dashboards",
      icon: <PieChart className="h-8 w-8 text-yellow-600" />,
      count: 42,
      color: "bg-yellow-100",
    },
    {
      id: "documents",
      name: "Documents",
      description: "Unstructured data in document format",
      icon: <FileText className="h-8 w-8 text-red-600" />,
      count: 31,
      color: "bg-red-100",
    },
    {
      id: "raw",
      name: "Raw Data",
      description: "Unprocessed data in various formats",
      icon: <FileCode className="h-8 w-8 text-gray-600" />,
      count: 19,
      color: "bg-gray-100",
    },
  ]

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dataset Types</h2>
        <a href="#" className="text-sm text-contoso-orange hover:underline">
          View All Types
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasetTypes.map((type) => (
          <Link
            key={type.id}
            href={`/datasets/type/${type.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className={`p-3 rounded-lg ${type.color}`}>{type.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-lg group-hover:text-contoso-orange transition-colors">
                {type.name}
                <span className="ml-2 text-sm text-gray-500">({type.count})</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
