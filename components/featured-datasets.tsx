import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, FileSpreadsheet, BarChart, FileText } from "lucide-react"

export function FeaturedDatasets() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Datasets</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our most popular and valuable datasets
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-contoso-orange" />
                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                  Tabular
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">Student Enrollment Data</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Comprehensive enrollment statistics across all departments and programs.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/50">
              <Link href="/datasets" className="text-sm font-medium text-contoso-orange hover:underline">
                View Dataset →
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-contoso-orange" />
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  Relational
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">Faculty Research Publications</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Database of research publications by faculty members across all disciplines.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/50">
              <Link href="/datasets" className="text-sm font-medium text-contoso-orange hover:underline">
                View Dataset →
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-contoso-orange" />
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Analytics
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">Campus Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Analytics on classroom, library, and facility usage patterns.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/50">
              <Link href="/datasets" className="text-sm font-medium text-contoso-orange hover:underline">
                View Dataset →
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-contoso-orange" />
                <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                  Documents
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">Course Catalogs Archive</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                Historical archive of university course catalogs and descriptions.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/50">
              <Link href="/datasets" className="text-sm font-medium text-contoso-orange hover:underline">
                View Dataset →
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/datasets"
            className="inline-flex items-center justify-center rounded-md bg-contoso-orange px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-contoso-orange/90 focus-visible:outline-none focus-visible:ring-1"
          >
            View All Datasets
          </Link>
        </div>
      </div>
    </section>
  )
}
