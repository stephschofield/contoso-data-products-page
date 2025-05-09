import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, BarChart2, FileText, Search, Users, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-contoso-blue text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Data Products Across Your Organization
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Find, explore, and request access to valuable data assets to power your insights and decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 bg-white text-contoso-blue hover:bg-white/90" asChild>
                    <Link href="/discover">Explore Data Products</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/datasets">Browse Datasets</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550&text=Data+Products+Platform"
                  width={550}
                  height={550}
                  alt="Data Products Platform"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-contoso-orange px-3 py-1 text-sm text-white">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need for Data Discovery
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a seamless experience for discovering, accessing, and utilizing data products
                  across your organization.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Search className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Powerful Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Find exactly what you need with our advanced search capabilities and filtering options.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Database className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Rich Data Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Browse our comprehensive catalog of datasets, reports, and analytics products.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BarChart2 className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Interactive Dashboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore data through interactive visualizations and dashboards for deeper insights.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Detailed Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access comprehensive documentation for all data products and datasets.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Users className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Simplified Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Request and manage access to restricted data products with our streamlined process.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Globe className="h-6 w-6 text-contoso-orange" />
                  <CardTitle>Organization-wide</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Discover data products from across your entire organization in one central location.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Explore Data Products?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start discovering valuable data assets to power your insights and decision-making today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-8 bg-contoso-orange hover:bg-contoso-orange/90" asChild>
                  <Link href="/discover">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-contoso-orange text-contoso-orange hover:bg-contoso-orange/10"
                  asChild
                >
                  <Link href="/documentation">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
