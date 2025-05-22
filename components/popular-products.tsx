import Image from "next/image"
import Link from "next/link"
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
            <div key={product.id} className="group relative overflow-hidden rounded-lg border">
              <Link href={`/discover/product/${product.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.title}</span>
              </Link>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={product.image || product.fallbackImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-4 flex flex-col justify-end">
                  <h3 className="font-bold text-lg text-white">{product.title}</h3>
                  <p className="text-sm text-white/80">{product.description}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
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
                      : "bg-contoso-blue hover:bg-contoso-blue/90"
                  }
                >
                  <Link href={`/discover/product/${product.id}`}>
                    {product.restricted ? "Request Now" : "Access Now"}
                  </Link>
                </Button>
              </div>
            </div>
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
