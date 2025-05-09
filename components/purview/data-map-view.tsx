"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getDataMapEntities } from "@/app/actions/purview-actions"
import type { PurviewEntity } from "@/lib/purview-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Database, Table, FileSpreadsheet, FileText, BarChart2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function DataMapView() {
  const [entities, setEntities] = useState<PurviewEntity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [entityType, setEntityType] = useState("")
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    loadEntities()
  }, [])

  async function loadEntities() {
    setLoading(true)
    try {
      const response = await getDataMapEntities(searchQuery, 20, entityType)
      setEntities(response.entities)
      setTotalCount(response.totalCount)
    } catch (error) {
      console.error("Error loading data map entities:", error)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    loadEntities()
  }

  function getEntityIcon(type: string) {
    switch (type.toLowerCase()) {
      case "table":
        return <Table className="h-5 w-5 text-blue-600" />
      case "database":
        return <Database className="h-5 w-5 text-purple-600" />
      case "column":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case "report":
        return <BarChart2 className="h-5 w-5 text-amber-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Map</CardTitle>
        <CardDescription>Browse and search data assets from your Purview catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search data assets..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={entityType} onValueChange={setEntityType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="azure_sql_table">SQL Tables</SelectItem>
              <SelectItem value="azure_blob_path">Blob Storage</SelectItem>
              <SelectItem value="azure_datalake_gen2_path">Data Lake</SelectItem>
              <SelectItem value="power_bi_dataset">Power BI</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Search</Button>
        </form>

        <div className="text-sm text-gray-500 mb-4">{loading ? "Loading..." : `${totalCount} assets found`}</div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {entities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No data assets found. Try adjusting your search.</div>
            ) : (
              entities.map((entity) => (
                <div key={entity.id} className="border rounded-md p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">{getEntityIcon(entity.entityType)}</div>
                    <div>
                      <h3 className="font-medium">{entity.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{entity.qualifiedName}</p>
                      {entity.description && <p className="text-sm mt-2">{entity.description}</p>}
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {entity.entityType}
                        </span>
                        {entity.classifications?.map((classification) => (
                          <span
                            key={classification}
                            className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded"
                          >
                            {classification}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
