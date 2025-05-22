import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Database, FileSearch, Lock, Share2, Users } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-contoso-orange px-3 py-1 text-sm text-white">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Comprehensive Data Discovery Platform
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides everything you need to find, understand, and use university data resources.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Database className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Rich Data Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Browse our comprehensive catalog of datasets across multiple domains and formats.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <FileSearch className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Advanced Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find exactly what you need with our powerful search and filtering capabilities.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Lock className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Secure Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Request access to restricted datasets with our streamlined approval process.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BarChart3 className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Data Products</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Access ready-to-use data products with visualizations and insights.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Share2 className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Data Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily share datasets and insights with colleagues and research partners.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Work together on data projects with integrated collaboration tools.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
