"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Database, FileText, Server, Table, Info, Tag, Clock, User, LinkIcon } from "lucide-react"

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  const [asset, setAsset] = useState<any>(null)
  const [lineage, setLineage] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await fetch(`/api/purview/asset/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch asset details")
        const data = await response.json()
        setAsset(data)

        // Fetch lineage data
        try {
          const lineageResponse = await fetch(`/api/purview/lineage/${params.id}`)
          if (lineageResponse.ok) {
            const lineageData = await lineageResponse.json()
            setLineage(lineageData)
          }
        } catch (lineageError) {
          console.error("Error fetching lineage:", lineageError)
        }
      } catch (err) {
        console.error("Error:", err)
        setError("Failed to load asset details")
      } finally {
        setLoading(false)
      }
    }

    fetchAssetDetails()
  }, [params.id])

  const getAssetIcon = (typeName: string) => {
    if (typeName?.includes("Table")) return <Table className="h-6 w-6 text-blue-600" />
    if (typeName?.includes("Database")) return <Database className="h-6 w-6 text-green-600" />
    if (typeName?.includes("File") || typeName?.includes("CSV")) return <FileText className="h-6 w-6 text-orange-600" />
    if (typeName?.includes("Server")) return <Server className="h-6 w-6 text-purple-600" />
    return <Info className="h-6 w-6 text-gray-600" />
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-contoso-blue"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !asset) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Asset</h2>
              <p className="text-gray-600 mb-6">{error || "Asset not found or could not be loaded"}</p>
              <Button onClick={() => router.push("/purview")}>Return to Purview Search</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const entity = asset.entity
  const attributes = entity.attributes || {}
  const classifications = entity.classifications || []
  const typeName = entity.typeName || "Unknown"

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="mb-6 flex items-start gap-4">
          <div className="p-3 bg-gray-100 rounded-lg">{getAssetIcon(typeName)}</div>
          <div>
            <h1 className="text-2xl font-bold">{attributes.name || "Unnamed Asset"}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{typeName.split(".").pop()}</Badge>
              {classifications.map((cls: any) => (
                <Badge key={cls.typeName} variant="secondary">
                  {cls.typeName}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="lineage">Lineage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Details</CardTitle>
                <CardDescription>Basic information about this data asset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Qualified Name</h3>
                    <p className="text-sm break-all">{attributes.qualifiedName || "N/A"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="text-sm">{attributes.description || "No description available"}</p>
                  </div>

                  {attributes.createTime && (
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Created</h3>
                        <p className="text-sm">{new Date(attributes.createTime).toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  {attributes.owner && (
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                        <p className="text-sm">{attributes.owner}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {classifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Classifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {classifications.map((cls: any) => (
                      <Badge key={cls.typeName} className="px-3 py-1">
                        {cls.typeName}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema Information</CardTitle>
              </CardHeader>
              <CardContent>
                {attributes.columns ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {attributes.columns.map((column: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {column.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.type || "Unknown"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {column.description || "No description"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No schema information available for this asset.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lineage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Data Lineage
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lineage && lineage.guidEntityMap ? (
                  <div>
                    <p className="mb-4">
                      This asset has lineage information available. The visualization would be displayed here.
                    </p>
                    <div className="p-4 border rounded bg-gray-50">
                      <p className="text-sm text-gray-600">
                        Lineage contains {Object.keys(lineage.guidEntityMap).length} related entities.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No lineage information available for this asset.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
