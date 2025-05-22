import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function DiscoverProducts() {
  const products = [
    {
      id: "student-success",
      title: "Student Success Dashboard",
      description: "Track student performance and identify at-risk students",
      image: "/images/student-success.jpeg",
      restricted: false,
    },
    {
      id: "enrollment-analytics",
      title: "Enrollment Analytics",
      description: "Analyze enrollment trends and demographics",
      image: "/images/enrollment-analytics.jpeg",
      restricted: true,
    },
    {
      id: "campus-resource",
      title: "Campus Resource Utilization",
      description: "Optimize space allocation and resource usage",
      image: "/images/campus-resource-utilization.jpeg",
      restricted: false,
    },
    {
      id: "student-demographics",
      title: "Student Demographics",
      description: "Explore student population demographics and trends",
      image: "/images/student-demographics.jpeg",
      restricted: true,
    },
    {
      id: "course-enrollment",
      title: "Course Enrollment Patterns",
      description: "Analyze course popularity and enrollment patterns",
      image: "/images/course-enrollment.jpeg",
      restricted: false,
    },
    {
      id: "alumni-careers",
      title: "Alumni Career Outcomes",
      description: "Track post-graduation employment and career paths",
      image: "/images/alumni-careers.jpeg",
      restricted: true,
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="group relative overflow-hidden rounded-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.title)}`}
              alt={product.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 p-4">
                <h3 className="font-bold text-lg text-white">{product.title}</h3>
                <p className="text-sm text-white/90 mt-1">{product.description}</p>
              </div>
            </div>
          </div>
          <div className="p-2 flex justify-between items-center">
            <div className="text-sm">
              {product.restricted ? (
                <span className="text-amber-600 font-medium">Restricted Access</span>
              ) : (
                <span className="text-green-600 font-medium">Public Access</span>
              )}
            </div>
            <Button
              asChild
              size="sm"
              className={
                product.restricted
                  ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }
            >
              <Link href={`/discover/product/${product.id}`}>{product.restricted ? "Request" : "Access"}</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
