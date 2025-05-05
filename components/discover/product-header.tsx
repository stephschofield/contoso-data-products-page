import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Lock, Star, Users, Clock, Share2 } from "lucide-react"
import Link from "next/link"

interface ProductHeaderProps {
  productId: number
}

export function ProductHeader({ productId }: ProductHeaderProps) {
  // Mock data - in a real app, you would fetch this based on the productId
  const product = {
    id: productId,
    title:
      productId === 1
        ? "Student Demographics Analysis"
        : productId === 2
          ? "Enrollment Analytics"
          : productId === 3
            ? "Campus Resource Utilization"
            : productId === 4
              ? "Course Enrollment Patterns"
              : productId === 5
                ? "Alumni Career Outcomes"
                : "Student Demographics Analysis",
    department:
      productId === 1
        ? "Institutional Research"
        : productId === 2
          ? "Student Services"
          : productId === 3
            ? "Facilities Management"
            : productId === 4
              ? "Academic Affairs"
              : productId === 5
                ? "Career Services"
                : "Institutional Research",
    description:
      productId === 1
        ? "Comprehensive breakdown of student population by various demographic factors"
        : productId === 2
          ? "Track and analyze enrollment trends, demographics, and projections"
          : productId === 3
            ? "Monitor usage patterns of campus facilities and resources"
            : productId === 4
              ? "Analysis of enrollment trends, popular courses, and scheduling optimization"
              : productId === 5
                ? "Employment statistics, career paths, and success metrics for graduates"
                : "Comprehensive breakdown of student population by various demographic factors",
    access:
      productId === 1
        ? "restricted"
        : productId === 2
          ? "public"
          : productId === 3
            ? "public"
            : productId === 4
              ? "restricted"
              : productId === 5
                ? "restricted"
                : "restricted",
    users:
      productId === 1
        ? 342
        : productId === 2
          ? 987
          : productId === 3
            ? 178
            : productId === 4
              ? 289
              : productId === 5
                ? 203
                : 342,
    rating:
      productId === 1
        ? 4.6
        : productId === 2
          ? 4.7
          : productId === 3
            ? 4.6
            : productId === 4
              ? 4.5
              : productId === 5
                ? 4.4
                : 4.6,
    updatedDays:
      productId === 1 ? 7 : productId === 2 ? 5 : productId === 3 ? 1 : productId === 4 ? 5 : productId === 5 ? 14 : 7,
    image:
      productId === 1
        ? "/images/student-demographics.jpeg"
        : productId === 2
          ? "/images/enrollment-analytics.jpeg"
          : productId === 3
            ? "/images/campus-resource-utilization.jpeg"
            : productId === 4
              ? "/images/course-enrollment.jpeg"
              : productId === 5
                ? "/images/alumni-careers.jpeg"
                : productId === 6
                  ? "/images/library-resource-usage.jpeg"
                  : "/images/student-demographics.jpeg",
  }

  return (
    <div className="relative">
      <div className="h-64 bg-gray-200 relative">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="container px-4">
        <div className="relative -mt-24 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <Link href="/discover" className="inline-flex items-center text-sm text-contoso-blue hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Data Products
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-600 mt-1">{product.department}</p>
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

          <p className="mt-4 text-gray-700 max-w-3xl">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-contoso-yellow" />
                <span className="font-medium">{product.rating}</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <Users className="h-5 w-5" />
                <span>{product.users} users</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Updated {product.updatedDays} days ago</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              {product.access === "restricted" ? (
                <Button size="sm" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white" asChild>
                  <Link href={`/request-access/${product.id}`}>Request Now</Link>
                </Button>
              ) : (
                <Button size="sm" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white">
                  Access Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
