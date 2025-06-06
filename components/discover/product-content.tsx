import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Database, Code, ExternalLink, Filter, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductContentProps {
  productId: number
}

export function ProductContent({ productId }: ProductContentProps) {
  // Determine which PowerBI dashboard to show based on product ID
  const dashboardImage =
    productId === 4
      ? "/images/powerbi-course-enrollment.jpeg"
      : "/placeholder.svg?height=400&width=800&text=Dashboard+Preview"

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Data Product Contents</h2>
        <p className="text-gray-600 mt-1">Explore what&apos;s included in this data product</p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="bg-gray-50 border-b border-gray-200 w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="dashboard"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-contoso-blue data-[state=active]:shadow-none rounded-none"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="datasets"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-contoso-blue data-[state=active]:shadow-none rounded-none"
          >
            Datasets
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-contoso-blue data-[state=active]:shadow-none rounded-none"
          >
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="p-6">
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* PowerBI Dashboard Header */}
              <div className="bg-[#f3f2f1] border-b border-gray-300 p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-[#f2c811] rounded w-5 h-5"></div>
                  <span className="font-medium text-sm">Power BI Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <RefreshCw className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* PowerBI Dashboard Content */}
              <div className="relative h-[500px] bg-white">
                <Image
                  src={dashboardImage || "/placeholder.svg"}
                  alt="PowerBI Dashboard"
                  fill
                  className="object-contain"
                />

                {/* Overlay for restricted access */}
                {productId === 4 && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
                      <h3 className="text-lg font-semibold mb-2">Restricted Dashboard</h3>
                      <p className="text-gray-600 mb-4">
                        This interactive dashboard requires access permissions. Request access to view and interact with
                        the full dashboard.
                      </p>
                      <Button className="bg-contoso-blue hover:bg-contoso-blue/90 text-white">
                        Request Dashboard Access
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Interactive Dashboard</h3>
              <p className="text-gray-700">
                {productId === 4 ? (
                  <>
                    This Power BI dashboard provides comprehensive visualizations of course enrollment patterns with
                    filtering capabilities by academic year, term, college, department, and program. It includes:
                  </>
                ) : (
                  <>
                    This interactive dashboard provides visualizations with filtering capabilities by academic year,
                    term, college, department, and program. It includes:
                  </>
                )}
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                {productId === 4 ? (
                  <>
                    <li>Course enrollment trends over time</li>
                    <li>Popular courses by department and level</li>
                    <li>Course capacity utilization</li>
                    <li>Enrollment patterns by time of day and day of week</li>
                    <li>Waitlist analytics and drop patterns</li>
                    <li>Comparative analysis with previous terms</li>
                  </>
                ) : (
                  <>
                    <li>Enrollment trends over time</li>
                    <li>Demographic breakdowns (age, gender, ethnicity, etc.)</li>
                    <li>Geographic distribution maps</li>
                    <li>Retention and graduation rates by demographic groups</li>
                    <li>Comparative analysis with peer institutions</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Power BI
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Interactive
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Real-time Data
              </Badge>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Dashboard Gallery</h3>
              <p className="text-gray-700 mb-4">
                Preview available dashboard views and reports included in this data product:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/images/powerbi-thumbnail.jpeg"
                      alt="Enrollment Trends Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Enrollment Trends</h4>
                    <p className="text-xs text-gray-500">Historical enrollment patterns</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/images/powerbi-course-enrollment.jpeg"
                      alt="Course Analytics Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Course Analytics</h4>
                    <p className="text-xs text-gray-500">Detailed course performance metrics</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=Capacity+Planning"
                      alt="Capacity Planning Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Capacity Planning</h4>
                    <p className="text-xs text-gray-500">Room and resource utilization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 4 ? "course_enrollment_summary.csv" : "student_demographics_summary.csv"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 4
                    ? "Aggregated course enrollment data by term, college, and program (3.8 MB)"
                    : "Aggregated student demographic data by term, college, and program (4.2 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 4 ? "enrollment_trends_5yr.xlsx" : "enrollment_trends_5yr.xlsx"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 4
                    ? "Five-year course enrollment trends with detailed breakdowns (4.2 MB)"
                    : "Five-year enrollment trends with demographic breakdowns (3.8 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <Database className="h-8 w-8 text-contoso-blue flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 4 ? "course_scheduling_data.json" : "geographic_distribution.json"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 4
                    ? "Course scheduling and room utilization data for optimization (2.8 MB)"
                    : "Geographic distribution data for mapping visualizations (2.1 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 4 ? "waitlist_analysis.xlsx" : "retention_graduation_rates.xlsx"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 4
                    ? "Analysis of waitlist patterns and course demand (1.7 MB)"
                    : "Retention and graduation rates by demographic groups (1.5 MB)"}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">API Access</h3>
              <p className="text-gray-700">
                {productId === 4
                  ? "This data product provides a RESTful API for programmatic access to course enrollment data. The API supports filtering, aggregation, and time-series analysis."
                  : "This data product provides a RESTful API for programmatic access to student demographic data. The API supports filtering, aggregation, and time-series analysis."}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium mb-2">API Endpoint</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                {productId === 4
                  ? "https://api.data.contoso.edu/v1/course-enrollments"
                  : "https://api.data.contoso.edu/v1/student-demographics"}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Example Request</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                <Code className="inline-block h-4 w-4 mr-2 text-blue-400" />
                {productId === 4
                  ? "GET /v1/course-enrollments?year=2023&term=fall&department=CSCI"
                  : "GET /v1/student-demographics?year=2023&term=fall&college=engineering"}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Documentation</h4>
              <p className="text-gray-700">
                For complete API documentation, including authentication, parameters, and response formats, please refer
                to the{" "}
                <a href="#" className="text-contoso-blue hover:underline">
                  API Documentation
                </a>
                .
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
