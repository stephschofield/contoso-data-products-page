"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"

const popularProducts = [
  {
    id: "enrollment-dashboard",
    title: "Student Enrollment Dashboard",
    description: "Interactive dashboard showing enrollment trends, demographics, and program popularity.",
    category: "Analytics",
    users: 450,
    lastUpdated: "2024-01-15",
    featured: true,
  },
  {
    id: "research-impact",
    title: "Research Impact Tracker",
    description: "Track citation metrics, collaboration networks, and research output across departments.",
    category: "Research",
    users: 320,
    lastUpdated: "2024-01-12",
    featured: false,
  },
  {
    id: "campus-operations",
    title: "Campus Operations Monitor",
    description: "Real-time monitoring of facilities, energy usage, and maintenance schedules.",
    category: "Operations",
    users: 180,
    lastUpdated: "2024-01-10",
    featured: true,
  },
]

export function PopularProducts() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-contoso-orange px-3 py-1 text-sm text-white">Data Products</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Data Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ready-to-use data products with built-in analytics and visualizations for immediate insights.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{product.category}</Badge>
                  {product.featured && <Badge className="bg-contoso-orange">Featured</Badge>}
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-contoso-orange" />
                  {product.title}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{product.users} active users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Popular</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {product.lastUpdated}</span>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/data-products/${product.id}`}>Explore Product</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/data-products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
