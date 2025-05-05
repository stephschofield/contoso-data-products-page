import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Users, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

export function DiscoverProducts() {
  const products = [
    {
      id: 1,
      title: "Student Demographics Analysis",
      description: "Comprehensive breakdown of student population by various demographic factors",
      department: "Institutional Research",
      access: "restricted",
      users: 342,
      updatedDays: 7,
      tags: ["demographics", "analytics", "enrollment"],
      image: "/images/student-demographics.jpeg",
    },
    {
      id: 2,
      title: "Enrollment Analytics",
      description: "Track and analyze enrollment trends, demographics, and projections",
      department: "Student Services",
      access: "public",
      users: 987,
      updatedDays: 5,
      tags: ["enrollment", "analytics", "trends"],
      image: "/images/enrollment-analytics.jpeg",
    },
    {
      id: 3,
      title: "Campus Resource Utilization",
      description: "Monitor usage patterns of campus facilities and resources",
      department: "Facilities Management",
      access: "public",
      users: 178,
      updatedDays: 1,
      tags: ["sustainability", "operations", "utilities"],
      image: "/images/campus-resource-utilization.jpeg",
    },
    {
      id: 4,
      title: "Course Enrollment Patterns",
      description: "Analysis of enrollment trends, popular courses, and scheduling optimization",
      department: "Academic Affairs",
      access: "restricted",
      users: 289,
      updatedDays: 5,
      tags: ["courses", "enrollment", "scheduling"],
      image: "/images/course-enrollment.jpeg",
    },
    {
      id: 5,
      title: "Alumni Career Outcomes",
      description: "Employment statistics, career paths, and success metrics for graduates",
      department: "Career Services",
      access: "restricted",
      users: 203,
      updatedDays: 14,
      tags: ["alumni", "careers", "outcomes"],
      image: "/images/alumni-careers.jpeg",
    },
    {
      id: 6,
      title: "Library Resource Usage",
      description: "Statistics on library visits, resource checkouts, and digital access",
      department: "University Libraries",
      access: "public",
      users: 156,
      updatedDays: 2,
      tags: ["library", "resources", "usage"],
      image: "/images/library-resource-usage.jpeg",
    },
  ]

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:border-contoso-blue hover:shadow-sm transition-all"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={120}
                height={120}
                className="rounded-md object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.department}</p>
                </div>

                {product.access === "restricted" ? (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <Lock className="h-3 w-3" />
                    <span>Restricted Access</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Public
                  </Badge>
                )}
              </div>

              <p className="mt-2 text-gray-600">{product.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{product.users} users</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      Updated {product.updatedDays} {product.updatedDays === 1 ? "day" : "days"} ago
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/discover/product/${product.id}`}>View Details</Link>
                  </Button>

                  {product.access === "restricted" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                      asChild
                    >
                      <Link href={`/request-access/${product.id}`}>
                        Request Now
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white">
                      Access Now
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
