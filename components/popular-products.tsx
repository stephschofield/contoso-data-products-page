import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PopularProducts() {
  const products = [
    {
      id: "student-success",
      title: "Student Success Dashboard",
      description: "Interactive dashboard for tracking student performance metrics and identifying at-risk students.",
      image: "/images/student-success.jpeg",
      badges: [
        { text: "Dashboard", variant: "blue" },
        { text: "Popular", variant: "green" },
      ],
      restricted: true,
    },
    {
      id: "enrollment-analytics",
      title: "Enrollment Analytics",
      description: "Comprehensive analytics on student enrollment patterns and trends across departments.",
      image: "/images/enrollment-analytics.jpeg",
      badges: [
        { text: "Analytics", variant: "purple" },
        { text: "Trending", variant: "orange" },
      ],
      restricted: false,
    },
    {
      id: "campus-resource",
      title: "Campus Resource Utilization",
      description: "Real-time insights into campus facility usage, classroom occupancy, and resource allocation.",
      image: "/images/campus-resource-utilization.jpeg",
      badges: [
        { text: "Reports", variant: "green" },
        { text: "Real-time", variant: "blue" },
      ],
      restricted: true,
    },
  ]

  const getBadgeClasses = (variant: string) => {
    const variants = {
      blue: "bg-blue-50 text-blue-700 hover:bg-blue-50",
      green: "bg-green-50 text-green-700 hover:bg-green-50",
      purple: "bg-purple-50 text-purple-700 hover:bg-purple-50",
      orange: "bg-orange-50 text-orange-700 hover:bg-orange-50",
    }
    return variants[variant as keyof typeof variants] || variants.blue
  }

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Data Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most requested dashboards and analytics tools, helping teams collaborate on data-driven
              decisions
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {product.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className={getBadgeClasses(badge.variant)}>
                      {badge.text}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Link href={`/discover/product/${index + 1}`} className="w-full">
                  <Button
                    className={
                      product.restricted
                        ? "w-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800"
                        : "w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    }
                  >
                    {product.restricted ? "Request Access" : "Access Now"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/data-products"
            className="inline-flex items-center justify-center rounded-md bg-contoso-orange px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-contoso-orange/90 focus-visible:outline-none focus-visible:ring-1"
          >
            View All Data Products
          </Link>
        </div>
      </div>
    </section>
  )
}
