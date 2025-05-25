"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ProductCard from "../product-card"
import { useSession } from "next-auth/react"

const DiscoverProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        // Check if user is authenticated
        if (status === "loading") {
          return // Still loading session
        }

        if (status === "unauthenticated") {
          setError("Please sign in to view data products")
          setLoading(false)
          return
        }

        console.log("Fetching products from API...")
        const response = await fetch("/api/data-products")

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error:", response.status, errorText)
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Received data:", data)
        setProducts(data.slice(0, 6)) // Show first 6 for discover page
      } catch (error) {
        console.error("Error fetching products:", error)
        setError(error instanceof Error ? error.message : "Failed to load data products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [status])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="text-red-800 font-medium">Error Loading Data Products</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          {status === "unauthenticated" && (
            <button
              onClick={() => (window.location.href = "/api/auth/signin")}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-gray-800 font-medium">No Data Products Found</h3>
          <p className="text-gray-600 text-sm mt-1">
            No data products are available in your Purview account, or you may not have permission to view them.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export { DiscoverProducts }
