import Image from "next/image"
import { MoreVertical, Lock, FileSpreadsheet, BarChart, PieChart, Database } from "lucide-react"

export function DatasetsList() {
  const datasets = [
    {
      id: 1,
      title: "Intellectual Engagement",
      author: "Waqar Ali",
      updatedDays: 8,
      usability: 10.0,
      size: "153 KB",
      icons: ["excel", "chart"],
      downloads: 16,
      isPrivate: true,
      image: "/placeholder.svg?height=200&width=300&text=Intellectual+Engagement",
    },
    {
      id: 2,
      title: "Career Readiness",
      author: "Pushpil Katibol",
      updatedDays: 11,
      usability: 7.1,
      size: "2 MB",
      icons: ["excel", "pie", "database"],
      downloads: 18,
      isPrivate: false,
      image: "/placeholder.svg?height=200&width=300&text=Career+Readiness",
    },
    {
      id: 3,
      title: "Academic Success",
      author: "Hari Gopikha",
      updatedDays: 16,
      usability: 8.9,
      size: "598 KB",
      icons: ["excel", "database", "chart"],
      downloads: 15,
      isPrivate: true,
      image: "/placeholder.svg?height=200&width=300&text=Academic+Success",
    },
    {
      id: 4,
      title: "Chatbots' Impact on University Learning",
      author: "Joseph Demeo",
      updatedDays: 9,
      usability: 9.4,
      size: "484 KB",
      icons: ["excel", "pie", "chart"],
      downloads: 9,
      isPrivate: false,
      image: "/placeholder.svg?height=200&width=300&text=Chatbots+Impact",
    },
  ]

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
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="text-xs">-</span>
                  <span className="text-sm">{dataset.downloads}</span>
                </div>

                {dataset.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
