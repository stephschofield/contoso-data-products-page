import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PopularProducts() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Data Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most requested dashboards and analytics tools
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image src="/images/student-success.jpeg" alt="Student Success Dashboard" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  Dashboard
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Popular
                </Badge>
              </div>
              <CardTitle className="text-lg">Student Success Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Interactive dashboard for tracking student performance metrics and identifying at-risk students.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Link href="/discover/product/1" className="w-full">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Access Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image src="/images/enrollment-analytics.jpeg" alt="Enrollment Analytics" fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                  Analytics
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">
                  Trending
                </Badge>
              </div>
              <CardTitle className="text-lg">Enrollment Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Comprehensive analytics on student enrollment patterns and trends across departments.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Link href="/discover/product/2" className="w-full">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Access Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/images/campus-resource-utilization.jpeg"
                alt="Campus Resource Utilization"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Reports
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  Real-time
                </Badge>
              </div>
              <CardTitle className="text-lg">Campus Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Real-time insights into campus facility usage, classroom occupancy, and resource allocation.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Link href="/discover/product/3" className="w-full">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Access Now</Button>
              </Link>
            </CardFooter>
          </Card>
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
