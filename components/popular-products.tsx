import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, ArrowRight, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PopularProducts() {
  const products = [
    {
      id: 1,
      title: "Student Demographics Dashboard",
      description:
        "Interactive dashboard showing student population breakdown by demographics, enrollment status, and trends.",
      image: "/images/student-demographics.jpeg",
      rating: 4.8,
      users: 1543,
      lastUpdated: "2 days ago",
      access: "restricted",
      department: "Institutional Research",
    },
    {
      id: 4,
      title: "Course Enrollment Analytics",
      description:
        "Comprehensive analysis of course enrollment patterns, capacity utilization, and scheduling optimization.",
      image: "/images/course-enrollment.jpeg",
      rating: 4.6,
      users: 987,
      lastUpdated: "1 week ago",
      access: "restricted",
      department: "Academic Affairs",
    },
    {
      id: 5,
      title: "Alumni Career Outcomes",
      description: "Track graduate employment rates, career paths, and success metrics across different programs.",
      image: "/images/alumni-careers.jpeg",
      rating: 4.7,
      users: 654,
      lastUpdated: "3 days ago",
      access: "public",
      department: "Career Services",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Data Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most used data products that provide valuable insights for university operations and research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                {product.access === "restricted" && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Lock className="h-3 w-3 mr-1" />
                      Restricted
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <Badge variant="secondary">{product.department}</Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {product.users} users
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {product.lastUpdated}
                  </div>
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/discover/product/${product.id}`}>
                    View Product
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white" asChild>
            <Link href="/discover">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
