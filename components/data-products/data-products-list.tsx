"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface DataProduct {
  id: string
  name: string
  description: string
  provider: string
  cost: number
}

const DataProductsList: React.FC = () => {
  const [products, setProducts] = useState<DataProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch("/api/data-products")

        if (!response.ok) {
          throw new Error("Failed to fetch data products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching data products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading data products...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Data Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-700">Provider: {product.provider}</p>
            <p className="text-green-500">Cost: ${product.cost}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { DataProductsList }
