import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Database, Code, ExternalLink, Filter, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductContentProps {
  productId: number
}

export function ProductContent({ productId }: ProductContentProps) {
  // Determine which dashboard to show based on product ID
  const dashboardImage =
    productId === 1
      ? "/placeholder.svg?height=400&width=800&text=Customer+360+Dashboard"
      : productId === 2
        ? "/placeholder.svg?height=400&width=800&text=Credit+Risk+Dashboard"
        : productId === 3
          ? "/placeholder.svg?height=400&width=800&text=Compliance+Dashboard"
          : "/placeholder.svg?height=400&width=800&text=Financial+Dashboard"

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Data Product Contents</h2>
        <p className="text-gray-600 mt-1">Explore what's included in this financial data product</p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="bg-gray-50 border-b border-gray-200 w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="dashboard"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="datasets"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
          >
            Datasets
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00336f] data-[state=active]:shadow-none rounded-none"
          >
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="p-6">
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-[#f3f2f1] border-b border-gray-300 p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-[#00336f] rounded w-5 h-5"></div>
                  <span className="font-medium text-sm">Financial Dashboard</span>
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

              {/* Dashboard Content */}
              <div className="relative h-[500px] bg-white">
                <Image
                  src={dashboardImage || "/placeholder.svg"}
                  alt="Financial Dashboard"
                  fill
                  className="object-contain"
                />

                {/* Overlay for restricted access */}
                {productId === 2 && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md text-center">
                      <h3 className="text-lg font-semibold mb-2">Restricted Dashboard</h3>
                      <p className="text-gray-600 mb-4">
                        This interactive dashboard contains sensitive risk data and requires special access permissions.
                        Request access to view and interact with the full dashboard.
                      </p>
                      <Button className="bg-[#00336f] hover:bg-[#00336f]/90 text-white">
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
                {productId === 1 ? (
                  <>
                    This interactive dashboard provides comprehensive visualizations of customer financial behavior with
                    filtering capabilities by segment, product, channel, and time period. It includes:
                  </>
                ) : productId === 2 ? (
                  <>
                    This risk assessment dashboard provides comprehensive visualizations of credit risk metrics with
                    filtering capabilities by portfolio, product, risk level, and time period. It includes:
                  </>
                ) : productId === 3 ? (
                  <>
                    This compliance monitoring dashboard provides comprehensive visualizations of regulatory metrics
                    with filtering capabilities by regulation type, business unit, and time period. It includes:
                  </>
                ) : (
                  <>
                    This interactive dashboard provides comprehensive visualizations with filtering capabilities by
                    various dimensions and time periods. It includes:
                  </>
                )}
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                {productId === 1 ? (
                  <>
                    <li>Customer segmentation analysis</li>
                    <li>Product usage and engagement metrics</li>
                    <li>Channel preference and behavior</li>
                    <li>Customer lifetime value projections</li>
                    <li>Attrition risk indicators</li>
                    <li>Cross-sell and up-sell opportunities</li>
                  </>
                ) : productId === 2 ? (
                  <>
                    <li>Credit score distribution</li>
                    <li>Default probability analysis</li>
                    <li>Portfolio risk concentration</li>
                    <li>Loan performance metrics</li>
                    <li>Risk trend analysis</li>
                    <li>Stress testing scenarios</li>
                  </>
                ) : productId === 3 ? (
                  <>
                    <li>Regulatory compliance status</li>
                    <li>KYC/AML alert monitoring</li>
                    <li>Suspicious activity reporting</li>
                    <li>Regulatory filing status</li>
                    <li>Compliance risk heat map</li>
                    <li>Audit trail and documentation</li>
                  </>
                ) : (
                  <>
                    <li>Key performance indicators</li>
                    <li>Trend analysis and forecasting</li>
                    <li>Comparative benchmarks</li>
                    <li>Drill-down capabilities</li>
                    <li>Custom reporting options</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Interactive
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Real-time Data
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Export Enabled
              </Badge>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Dashboard Gallery</h3>
              <p className="text-gray-700 mb-4">
                Preview available dashboard views and reports included in this financial data product:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=Overview+Dashboard"
                      alt="Overview Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Overview</h4>
                    <p className="text-xs text-gray-500">Executive summary view</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=Detailed+Analysis"
                      alt="Detailed Analysis Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Detailed Analysis</h4>
                    <p className="text-xs text-gray-500">In-depth metrics and trends</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=Forecasting"
                      alt="Forecasting Dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium text-sm">Forecasting</h4>
                    <p className="text-xs text-gray-500">Predictive analytics and projections</p>
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
                  {productId === 1
                    ? "customer_segmentation.csv"
                    : productId === 2
                      ? "credit_risk_scores.csv"
                      : productId === 3
                        ? "compliance_metrics.csv"
                        : "financial_data.csv"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 1
                    ? "Customer segmentation data with behavioral and financial attributes (4.2 MB)"
                    : productId === 2
                      ? "Credit risk scores and default probabilities by customer segment (3.8 MB)"
                      : productId === 3
                        ? "Compliance metrics and regulatory status indicators (2.5 MB)"
                        : "Core financial data for analysis and reporting (3.5 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 1
                    ? "customer_journey.xlsx"
                    : productId === 2
                      ? "portfolio_risk_analysis.xlsx"
                      : productId === 3
                        ? "regulatory_filings.xlsx"
                        : "trend_analysis.xlsx"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 1
                    ? "Customer journey mapping with touchpoints and conversion metrics (3.5 MB)"
                    : productId === 2
                      ? "Portfolio risk analysis with concentration metrics and stress tests (4.2 MB)"
                      : productId === 3
                        ? "Regulatory filing status and compliance history (3.1 MB)"
                        : "Trend analysis with historical data and projections (3.8 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <Database className="h-8 w-8 text-[#00336f] flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 1
                    ? "customer_transactions.json"
                    : productId === 2
                      ? "risk_factors.json"
                      : productId === 3
                        ? "compliance_alerts.json"
                        : "financial_metrics.json"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 1
                    ? "Anonymized customer transaction data for pattern analysis (5.8 MB)"
                    : productId === 2
                      ? "Risk factor data for model inputs and scenario analysis (2.8 MB)"
                      : productId === 3
                        ? "Compliance alerts and resolution tracking data (3.2 MB)"
                        : "Key financial metrics and performance indicators (2.5 MB)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium">
                  {productId === 1
                    ? "product_usage.xlsx"
                    : productId === 2
                      ? "loan_performance.xlsx"
                      : productId === 3
                        ? "audit_reports.xlsx"
                        : "performance_metrics.xlsx"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {productId === 1
                    ? "Product usage statistics and engagement metrics (2.7 MB)"
                    : productId === 2
                      ? "Loan performance metrics including defaults and prepayments (3.4 MB)"
                      : productId === 3
                        ? "Audit reports and compliance assessment results (4.5 MB)"
                        : "Detailed performance metrics for financial analysis (3.2 MB)"}
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
                {productId === 1
                  ? "This data product provides a RESTful API for programmatic access to customer data. The API supports filtering, aggregation, and time-series analysis with proper authentication and authorization."
                  : productId === 2
                    ? "This data product provides a RESTful API for programmatic access to risk assessment data. The API supports risk scoring, portfolio analysis, and scenario testing with proper authentication and authorization."
                    : productId === 3
                      ? "This data product provides a RESTful API for programmatic access to compliance monitoring data. The API supports regulatory reporting, alert monitoring, and audit trail access with proper authentication and authorization."
                      : "This data product provides a RESTful API for programmatic access to financial data. The API supports filtering, aggregation, and time-series analysis with proper authentication and authorization."}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium mb-2">API Endpoint</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                {productId === 1
                  ? "https://api.globalfinancial.com/v1/customer-analytics"
                  : productId === 2
                    ? "https://api.globalfinancial.com/v1/risk-assessment"
                    : productId === 3
                      ? "https://api.globalfinancial.com/v1/compliance-monitoring"
                      : "https://api.globalfinancial.com/v1/financial-data"}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Example Request</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                <Code className="inline-block h-4 w-4 mr-2 text-blue-400" />
                {productId === 1
                  ? "GET /v1/customer-analytics/segments?product=savings&channel=mobile&period=last_90_days"
                  : productId === 2
                    ? "GET /v1/risk-assessment/scores?portfolio=consumer&product=mortgage&risk_level=medium"
                    : productId === 3
                      ? "GET /v1/compliance-monitoring/alerts?status=open&priority=high&regulation=aml"
                      : "GET /v1/financial-data/metrics?category=performance&period=quarterly&year=2023"}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Documentation</h4>
              <p className="text-gray-700">
                For complete API documentation, including authentication, parameters, and response formats, please refer
                to the{" "}
                <a href="#" className="text-[#00336f] hover:underline">
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
