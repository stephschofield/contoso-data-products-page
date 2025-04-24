import { Database, BarChart2, PieChart, FileText, Users, Globe, Server, Layers } from "lucide-react"
import Link from "next/link"

export function DiscoverCategories() {
  const categories = [
    {
      name: "Datasets",
      icon: <Database className="h-6 w-6" />,
      description: "Raw and processed data collections",
      count: 245,
    },
    {
      name: "Dashboards",
      icon: <BarChart2 className="h-6 w-6" />,
      description: "Interactive visual analytics",
      count: 128,
    },
    {
      name: "Reports",
      icon: <FileText className="h-6 w-6" />,
      description: "Formatted data insights",
      count: 93,
    },
    {
      name: "Demographics",
      icon: <Users className="h-6 w-6" />,
      description: "Population and user statistics",
      count: 67,
    },
    {
      name: "Geospatial",
      icon: <Globe className="h-6 w-6" />,
      description: "Location-based data",
      count: 52,
    },
    {
      name: "APIs",
      icon: <Server className="h-6 w-6" />,
      description: "Data service endpoints",
      count: 41,
    },
    {
      name: "Data Models",
      icon: <Layers className="h-6 w-6" />,
      description: "Structured data schemas",
      count: 38,
    },
    {
      name: "Visualizations",
      icon: <PieChart className="h-6 w-6" />,
      description: "Static data graphics",
      count: 76,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            href={`/discover/category/${category.name.toLowerCase()}`}
            key={category.name}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-[#9e1b32] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-[#9e1b32] group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
            <p className="text-xs text-gray-500">{category.count} products</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
