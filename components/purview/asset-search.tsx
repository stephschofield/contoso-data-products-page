"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, FileText, Server, Table, Info, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Asset {
  id: string
  name: string
  qualifiedName: string
  typeName: string
  description?: string
  classification?: string[]
}

export function AssetSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [assets, setAssets] = useState<Asset[]>([])
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setError("")

    try {
      const response = await fetch("/api/purview/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      // Transform the Purview response to our Asset interface
      const transformedAssets = data.value.map((item: any) => ({
        id: item.id,
        name: item.displayText || item.name || "Unnamed Asset",
        qualifiedName: item.qualifiedName || "",
        typeName: item.typeName || "Unknown",
        description: item.description || "",
        classification: item.classifications?.map((c: any) => c.name) || [],
      }))

      setAssets(transformedAssets)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to search assets. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const getAssetIcon = (typeName: string) => {
    if (typeName.includes("Table")) return <Table className="h-5 w-5 text-blue-600" />
    if (typeName.includes("Database")) return <Database className="h-5 w-5 text-green-600" />
    if (typeName.includes("File") || typeName.includes("CSV")) return <FileText className="h-5 w-5 text-orange-600" />
    if (typeName.includes("Server")) return <Server className="h-5 w-5 text-purple-600" />
    return <Info className="h-5 w-5 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search data assets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        {assets.map((asset) => (
          <Card key={asset.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getAssetIcon(asset.typeName)}
                  <CardTitle className="text-lg">{asset.name}</CardTitle>
                </div>
                <Badge variant="outline">{asset.typeName.split(".").pop()}</Badge>
              </div>
              <CardDescription className="truncate max-w-2xl">{asset.qualifiedName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{asset.description || "No description available"}</p>
              {asset.classification && asset.classification.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {asset.classification.map((cls) => (
                    <Badge key={cls} variant="secondary">
                      {cls}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link
                href={`/purview/asset/${asset.id}`}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                View Details <ExternalLink className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        ))}

        {assets.length === 0 && !isSearching && query && (
          <div className="text-center py-8 text-gray-500">No assets found matching your search.</div>
        )}
      </div>
    </div>
  )
}
