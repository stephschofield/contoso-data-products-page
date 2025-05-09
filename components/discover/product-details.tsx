import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText, Tag } from "lucide-react"

interface ProductDetailsProps {
  productId: number
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  // Mock data - in a real app, you would fetch this based on the productId
  const details = {
    description:
      "This data product provides a comprehensive analysis of student demographics across the university. It includes breakdowns by age, gender, ethnicity, geographic origin, major, and enrollment status. The data is updated weekly and can be used for institutional research, enrollment management, diversity initiatives, and strategic planning.",
    owner: "Office of Institutional Research",
    created: "January 15, 2023",
    updated: "August 3, 2023",
    version: "2.4",
    format: "Dashboard, CSV, API",
    tags: ["demographics", "students", "enrollment", "diversity", "institutional-research"],
    dataUpdated: "Weekly",
    dataSource: "Student Information System",
    dataQuality: "Verified",
    compliance: ["FERPA Compliant", "PII Protected"],
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Tabs defaultValue="overview">
        <TabsList className="bg-gray-50 border-b border-gray-200 w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="overview"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#9e1b32] data-[state=active]:shadow-none rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="metadata"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#9e1b32] data-[state=active]:shadow-none rounded-none"
          >
            Metadata
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#9e1b32] data-[state=active]:shadow-none rounded-none"
          >
            Usage Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-6">
          <h2 className="text-xl font-semibold mb-4">About this Data Product</h2>

          <p className="text-gray-700 mb-6">{details.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Owner</p>
                <p className="text-sm text-gray-600">{details.owner}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Created</p>
                <p className="text-sm text-gray-600">{details.created}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {details.updated} (v{details.version})
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Available Formats</p>
                <p className="text-sm text-gray-600">{details.format}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">Tags</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Metadata</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <p className="text-sm font-medium text-gray-700">Data Update Frequency</p>
              <p className="text-sm text-gray-600">{details.dataUpdated}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <p className="text-sm font-medium text-gray-700">Data Source</p>
              <p className="text-sm text-gray-600">{details.dataSource}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <p className="text-sm font-medium text-gray-700">Data Quality</p>
              <p className="text-sm text-gray-600">{details.dataQuality}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-sm font-medium text-gray-700">Compliance</p>
              <div>
                {details.compliance.map((item) => (
                  <p key={item} className="text-sm text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Guidelines</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Permitted Uses</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Institutional research and reporting</li>
                <li>Strategic planning and decision making</li>
                <li>Program evaluation and assessment</li>
                <li>Grant applications and reporting</li>
                <li>Internal presentations and communications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Restrictions</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Do not share raw data outside the institution without approval</li>
                <li>Do not use for identifying individual students</li>
                <li>Aggregated data must have a minimum of 10 students per group</li>
                <li>External publications require review by Institutional Research</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Attribution</h3>
              <p className="text-sm text-gray-700">
                When using this data in reports or presentations, please include the following attribution:
                <br />
                <span className="italic">
                  "Source: University of Arkansas Office of Institutional Research, Student Demographics Analysis, v
                  {details.version}"
                </span>
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
