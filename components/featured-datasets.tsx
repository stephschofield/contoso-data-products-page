import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedDatasets() {
  const datasets = [
    {
      id: 1,
      title: "Student Enrollment Trends",
      description: "Comprehensive enrollment data across all colleges and programs with 5-year historical trends.",
      image: "/images/enrollment-analytics.jpeg",
      category: "Enrollment",
      lastUpdated: "2 days ago",
      users: 1247,
      trending: true,
      tags: ["enrollment", "trends", "historical"],
    },
    {
      id: 2,
      title: "Course Performance Analytics",
      description: "Detailed analysis of course completion rates, grades, and student success metrics.",
      image: "/images/course-enrollment.jpeg",
      category: "Academic",
      lastUpdated: "1 week ago",
      users: 892,
      trending: false,
      tags: ["courses", "performance", "grades"],
    },
    {
      id: 3,
      title: "Campus Resource Utilization",
      description: "Real-time and historical data on campus facility usage, including libraries and labs.",
      image: "/images/campus-resource-utilization.jpeg",
      category: "Facilities",
      lastUpdated: "3 days ago",
      users: 456,
      trending: true,
      tags: ["facilities", "utilization", "resources"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Datasets</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most popular and frequently accessed datasets that drive insights across the university.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image src={dataset.image || "/placeholder.svg"} alt={dataset.title} fill className="object-cover" />
                {dataset.trending && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 hover:bg-orange-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{dataset.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {dataset.lastUpdated}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{dataset.title}</h3>
                <p className="text-gray-600 mb-4">{dataset.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {dataset.users.toLocaleString()} users
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/datasets/${dataset.id}`}>
                    View Dataset
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/datasets">
              View All Datasets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
