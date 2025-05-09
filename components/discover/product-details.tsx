import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText, Tag, Shield, AlertTriangle } from "lucide-react"

interface ProductDetailsProps {
  productId: number
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  // Mock data - in a real app, you would fetch this based on the productId
  const details = {
    description:
      "This data product provides a comprehensive analysis of customer financial behavior across all banking channels and products. It includes transaction patterns, product usage, engagement metrics, lifetime value, and risk indicators. The data is updated daily and can be used for customer segmentation, personalized marketing, risk assessment, and product development.",
    owner: "Customer Analytics Department",
    created: "January 15, 2023",
    updated: "August 3, 2023",
    version: "3.2",
    format: "Dashboard, CSV, API",
    tags: ["customer", "analytics", "behavior", "segmentation", "financial-insights"],
    dataUpdated: "Daily",
    dataSource: "Core Banking System, Digital Banking Platform, CRM",
    dataQuality: "Verified",
    compliance: ["GDPR Compliant", "PII Protected", "ISO 27001 Certified"],
    sensitivity: "High - Contains anonymized customer data",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Tabs defaultValue="overview">
        <TabsList className="bg-gray-50 border-b border-gray-200 w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="overview"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="metadata"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
          >
            Metadata
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
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

            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Data Sensitivity</p>
                <p className="text-sm text-gray-600">{details.sensitivity}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Compliance</p>
                <p className="text-sm text-gray-600">{details.compliance.join(", ")}</p>
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
                <li>Customer segmentation and targeting</li>
                <li>Product development and optimization</li>
                <li>Risk assessment and management</li>
                <li>Customer experience improvement</li>
                <li>Internal reporting and analytics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Restrictions</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Do not share data outside the organization without approval</li>
                <li>Do not use for direct marketing without proper consent</li>
                <li>Aggregated data must have a minimum of 50 customers per group</li>
                <li>Do not attempt to re-identify anonymized individuals</li>
                <li>External publications require review by Compliance and Data Governance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Attribution</h3>
              <p className="text-sm text-gray-700">
                When using this data in reports or presentations, please include the following attribution:
                <br />
                <span className="italic">
                  "Source: Global Financial Bank, Customer Analytics Department, Customer 360° Dashboard, v
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
