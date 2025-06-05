"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Users, Clock, ExternalLink, Building, Loader2 } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number | string
  title: string
  description: string
  department: string
  access: string
  users?: number
  updatedDays?: number
  tags: string[]
  image?: string
  source: "curated" | "purview"
  typeName?: string
  qualifiedName?: string
}

export function DiscoverProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showPurviewAssets, setShowPurviewAssets] = useState(true)

  // Curated products
  const curatedProducts: Product[] = [
    {
      id: 1,
      title: "Student Demographics Analysis",
      description: "Comprehensive breakdown of student population by various demographic factors",
      department: "Institutional Research",
      access: "restricted",
      users: 342,
      updatedDays: 7,
      tags: ["demographics", "analytics", "enrollment"],
      image: "/images/student-demographics.jpeg",
      source: "curated",
    },
    {
      id: 2,
      title: "Enrollment Analytics",
      description: "Track and analyze enrollment trends, demographics, and projections",
      department: "Student Services",
      access: "public",
      users: 987,
      updatedDays: 5,
      tags: ["enrollment", "analytics", "trends"],
      image: "/images/enrollment-analytics.jpeg",
      source: "curated",
    },
    {
      id: 3,
      title: "Campus Resource Utilization",
      description: "Monitor usage patterns of campus facilities and resources",
      department: "Facilities Management",
      access: "public",
      users: 178,
      updatedDays: 1,
      tags: ["sustainability", "operations", "utilities"],
      image: "/images/campus-resource-utilization.jpeg",
      source: "curated",
    },
    {
      id: 4,
      title: "Course Enrollment Patterns",
      description: "Analysis of enrollment trends, popular courses, and scheduling optimization",
      department: "Academic Affairs",
      access: "restricted",
      users: 289,
      updatedDays: 5,
      tags: ["courses", "enrollment", "scheduling"],
      image: "/images/course-enrollment.jpeg",
      source: "curated",
    },
    {
      id: 5,
      title: "Alumni Career Outcomes",
      description: "Employment statistics, career paths, and success metrics for graduates",
      department: "Career Services",
      access: "restricted",
      users: 203,
      updatedDays: 14,
      tags: ["alumni", "careers", "outcomes"],
      image: "/images/alumni-careers.jpeg",
      source: "curated",
    },
    {
      id: 6,
      title: "Library Resource Usage",
      description: "Statistics on library visits, resource checkouts, and digital access",
      department: "University Libraries",
      access: "public",
      users: 156,
      updatedDays: 2,
      tags: ["library", "resources", "usage"],
      image: "/images/library-resource-usage.jpeg",
      source: "curated",
    },
  ]

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      let allProducts = [...curatedProducts]

      if (showPurviewAssets) {
        try {
          // Fetch popular/recent assets from Purview
          const response = await fetch("/api/purview/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: "*", limit: 10 }),
          })

          if (response.ok) {
            const purviewData = await response.json()
            const purviewAssets: Product[] = (purviewData.value || []).map((asset: any, index: number) => ({
              id: `purview-${asset.id || index}`,
              title: asset.displayText || asset.name || "Unnamed Asset",
              description: asset.description || `${asset.typeName} from Microsoft Purview catalog`,
              department: "Microsoft Purview",
              access: "restricted", // Assume restricted for Purview assets
              tags: [
                asset.typeName?.split(".").pop()?.toLowerCase() || "unknown",
                "purview",
                ...(asset.classifications?.map((c: any) => c.name.toLowerCase()) || []),
              ],
              source: "purview" as const,
              typeName: asset.typeName,
              qualifiedName: asset.qualifiedName,
            }))

            allProducts = [...allProducts, ...purviewAssets]
          }
        } catch (error) {
          console.error("Error fetching Purview assets:", error)
        }
      }

      setProducts(allProducts)
      setLoading(false)
    }

    loadProducts()
  }, [showPurviewAssets])

  const getSourceIcon = (product: Product) => {
    if (product.source === "purview") {
      return <Building className="h-4 w-4 text-purple-600" />
    }
    return null
  }

  const getSourceBadge = (product: Product) => {
    if (product.source === "purview") {
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
          <Building className="h-3 w-3 mr-1" />
          Purview
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
        Curated
      </Badge>
    )
  }

  const getProductLink = (product: Product) => {
    if (product.source === "purview") {
      return `/purview/asset/${product.id.toString().replace("purview-", "")}`
    }
    return `/discover/product/${product.id}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading data products...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">All Data Products & Assets</h2>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-purview"
              checked={showPurviewAssets}
              onChange={(e) => setShowPurviewAssets(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="show-purview" className="text-sm text-gray-600">
              Include Purview assets
            </label>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Showing {products.filter((p) => p.source === "curated").length} curated products
          {showPurviewAssets && ` and ${products.filter((p) => p.source === "purview").length} Purview assets`}
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={`${product.source}-${product.id}`}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-contoso-blue hover:shadow-sm transition-all"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {product.image ? (
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-gray-100 rounded-md flex items-center justify-center">
                    {getSourceIcon(product) || <Building className="h-8 w-8 text-gray-400" />}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{product.title}</h3>
                      {getSourceBadge(product)}
                    </div>
                    <p className="text-sm text-gray-500">{product.department}</p>
                    {product.source === "purview" && product.qualifiedName && (
                      <p className="text-xs text-gray-400 mt-1 truncate max-w-md">{product.qualifiedName}</p>
                    )}
                  </div>

                  {product.access === "restricted" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      <Lock className="h-3 w-3" />
                      <span>Restricted Access</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Public
                    </Badge>
                  )}
                </div>

                <p className="mt-2 text-gray-600">{product.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    {product.users && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{product.users} users</span>
                      </div>
                    )}

                    {product.updatedDays && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          Updated {product.updatedDays} {product.updatedDays === 1 ? "day" : "days"} ago
                        </span>
                      </div>
                    )}

                    {product.source === "purview" && product.typeName && (
                      <div className="text-xs text-purple-600">{product.typeName.split(".").pop()}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={getProductLink(product)}>View Details</Link>
                    </Button>

                    {product.access === "restricted" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                        asChild
                      >
                        <Link
                          href={
                            product.source === "purview" ? getProductLink(product) : `/request-access/${product.id}`
                          }
                        >
                          Request Now
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-contoso-blue hover:bg-contoso-blue/90 text-white" asChild>
                        <Link href={getProductLink(product)}>
                          Access Now
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
