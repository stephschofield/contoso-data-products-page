import Image from "next/image"
import { MoreVertical, Lock, Star, Users, BarChart2, PieChart, TrendingUp, Award, BookOpen } from "lucide-react"

export function DataProductsList() {
  const dataProducts = [
    {
      id: 1,
      title: "Student Success Dashboard",
      description: "Comprehensive analytics on student performance and engagement metrics",
      author: "Academic Analytics Team",
      updatedDays: 3,
      rating: 4.8,
      users: 245,
      tags: ["dashboard", "analytics"],
      isPrivate: false,
      image: "/images/student-success.jpeg",
    },
    {
      id: 2,
      title: "Research Funding Tracker",
      description: "Track and analyze research grants and funding opportunities",
      author: "Research Office",
      updatedDays: 5,
      rating: 4.6,
      users: 128,
      tags: ["finance", "visualization"],
      isPrivate: true,
      image: "/placeholder.svg?height=300&width=300&text=Research+Funding",
    },
    {
      id: 3,
      title: "Campus Engagement Map",
      description: "Interactive visualization of campus activities and student engagement",
      author: "Student Affairs",
      updatedDays: 7,
      rating: 4.9,
      users: 312,
      tags: ["map", "interactive"],
      isPrivate: false,
      image: "/images/campus-resource-utilization.jpeg",
    },
    {
      id: 4,
      title: "Alumni Career Outcomes",
      description: "Employment statistics, career paths, and success metrics for graduates",
      author: "Career Services",
      updatedDays: 14,
      rating: 4.4,
      users: 203,
      tags: ["alumni", "careers"],
      isPrivate: true,
      image: "/images/alumni-careers.jpeg",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dataProducts.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300&text=No+Image"}
              alt={product.title}
              fill
              className="object-cover"
            />
            <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
            {product.isPrivate && (
              <div className="absolute top-2 left-2 bg-[#9e1b32]/90 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Restricted</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-medium text-lg line-clamp-1">{product.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{product.rating}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{product.users}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">Updated {product.updatedDays} days ago</div>

              <div className="flex space-x-1">
                {product.tags.includes("dashboard") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                    <BarChart2 className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                )}
                {product.tags.includes("analytics") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full">
                    <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                )}
                {product.tags.includes("visualization") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                    <PieChart className="h-3.5 w-3.5 text-green-600" />
                  </div>
                )}
                {product.tags.includes("alumni") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full">
                    <Award className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                )}
                {product.tags.includes("careers") && (
                  <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-full">
                    <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
