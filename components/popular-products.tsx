import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PopularProducts() {
  const products = [
    {
      id: "student-success",
      title: "Student Success Dashboard",
      description: "Interactive dashboard for tracking student performance metrics and identifying at-risk students.",
      image: "/images/student-success-dashboard.png",
      fallbackImage: "/placeholder.svg?key=e6bi8",
      restricted: false,
    },
    {
      id: "enrollment-analytics",
      title: "Enrollment Analytics",
      description: "Comprehensive analytics on enrollment trends, demographics, and program popularity.",
      image: "/images/enrollment-analytics.jpeg",
      fallbackImage: "/placeholder.svg?key=n9hgf",
      restricted: true,
    },
    {
      id: "campus-resource",
      title: "Campus Resource Utilization",
      description: "Visualizations of campus resource usage patterns to optimize space allocation.",
      image: "/images/campus-resource-utilization.jpeg",
      fallbackImage: "/placeholder.svg?key=7dfbb",
      restricted: false,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Data Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ready-to-use data products with visualizations and insights
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                <Image src={product.image || product.fallbackImage} alt={product.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button
                  asChild
                  className={
                    product.restricted
                      ? "w-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800"
                      : "w-full bg-contoso-blue hover:bg-contoso-blue/90"
                  }
                >
                  <Link href={`/discover/product/${product.id}`}>
                    {product.restricted ? "Request Now" : "Access Now"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/discover"
            className="inline-flex items-center justify-center rounded-md bg-contoso-orange px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-contoso-orange/90 focus-visible:outline-none focus-visible:ring-1"
          >
            View All Data Products
          </Link>
        </div>
      </div>
    </section>
  )
}
