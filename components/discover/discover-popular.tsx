import Image from "next/image"
import { Star, Users, Clock } from "lucide-react"
import Link from "next/link"

export function DiscoverPopular() {
  const popularProducts = [
    {
      id: 1,
      title: "Student Success Dashboard",
      description: "Comprehensive analytics on student performance and engagement metrics",
      department: "Academic Affairs",
      users: 1245,
      rating: 4.8,
      updatedDays: 3,
      image: "/images/student-success.jpeg",
    },
    {
      id: 2,
      title: "Enrollment Analytics",
      description: "Track and analyze enrollment trends, demographics, and projections",
      department: "Student Services",
      users: 987,
      rating: 4.7,
      updatedDays: 5,
      image: "/images/enrollment-analytics.jpeg",
    },
    {
      id: 3,
      title: "Campus Resource Utilization",
      description: "Monitor usage patterns of campus facilities and resources",
      department: "Administration",
      users: 756,
      rating: 4.6,
      updatedDays: 2,
      image: "/images/campus-resource-utilization.jpeg",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Popular Data Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularProducts.map((product) => (
          <Link
            href={`/discover/product/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#9e1b32] hover:shadow-md transition-all group"
          >
            <div className="relative h-48">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg group-hover:text-[#ffb4b4] transition-colors">{product.title}</h3>
                  <p className="text-sm text-white/80">{product.department}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{product.users.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{product.rating}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{product.updatedDays}d ago</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
