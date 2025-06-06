"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Eye } from "lucide-react"
import Link from "next/link"

const featuredDatasets = [
  {
    id: "student-enrollment-2024",
    title: "Student Enrollment Analytics 2024",
    description: "Comprehensive enrollment data including demographics, program distribution, and trends.",
    category: "Academic",
    lastUpdated: "2024-01-15",
    downloads: 1250,
    views: 3400,
    access: "Public",
  },
  {
    id: "campus-sustainability",
    title: "Campus Sustainability Metrics",
    description: "Energy consumption, waste management, and environmental impact data.",
    category: "Operations",
    lastUpdated: "2024-01-10",
    downloads: 890,
    views: 2100,
    access: "Restricted",
  },
  {
    id: "research-publications",
    title: "Faculty Research Publications",
    description: "Publication data, citation metrics, and research collaboration networks.",
    category: "Research",
    lastUpdated: "2024-01-12",
    downloads: 2100,
    views: 5600,
    access: "Public",
  },
]

export function FeaturedDatasets() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-contoso-orange px-3 py-1 text-sm text-white">
              Featured Datasets
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular University Datasets</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our most accessed and valuable datasets across academic, research, and operational domains.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {featuredDatasets.map((dataset) => (
            <Card key={dataset.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={dataset.access === "Public" ? "default" : "secondary"}>{dataset.access}</Badge>
                  <Badge variant="outline">{dataset.category}</Badge>
                </div>
                <CardTitle className="text-lg">{dataset.title}</CardTitle>
                <CardDescription>{dataset.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{dataset.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{dataset.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{dataset.views.toLocaleString()} views</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/datasets/${dataset.id}`}>View Dataset</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/datasets">View All Datasets</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
