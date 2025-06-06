import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Database, BarChart3 } from "lucide-react"
import { AISearch } from "@/components/ai-search"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover University
                <span className="text-contoso-blue block">Data Products</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access comprehensive datasets, interactive dashboards, and analytics tools to support research,
                planning, and decision-making across the university.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white" asChild>
                <Link href="/discover">
                  Explore Data Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/datasets">Browse Datasets</Link>
              </Button>
            </div>

            <div className="pt-4">
              <AISearch />
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/university-data-analysis-main-page.jpg"
                alt="University Data Analysis Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-contoso-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Database className="h-8 w-8 text-contoso-blue" />
            </div>
            <h3 className="text-xl font-semibold">Rich Data Catalog</h3>
            <p className="text-gray-600">
              Explore our comprehensive collection of university datasets with detailed metadata and documentation.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Interactive Dashboards</h3>
            <p className="text-gray-600">
              Access pre-built analytics dashboards and visualization tools for immediate insights.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">AI-Powered Search</h3>
            <p className="text-gray-600">
              Find exactly what you need with natural language search powered by artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
