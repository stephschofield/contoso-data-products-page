"use client"

import { useState, useEffect } from "react"
import type { DataProduct } from "@/lib/purview-service"

export function useDataProducts(searchQuery?: string) {
  const [dataProducts, setDataProducts] = useState<DataProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchDataProducts() {
    try {
      setLoading(true)
      setError(null)

      const url = searchQuery ? `/api/data-products?search=${encodeURIComponent(searchQuery)}` : "/api/data-products"

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch data products")
      }

      const data = await response.json()
      setDataProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching data products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataProducts()
  }, [searchQuery])

  return { dataProducts, loading, error, refetch: () => fetchDataProducts() }
}

export function useDataProduct(id: string) {
  const [dataProduct, setDataProduct] = useState<DataProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDataProduct() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/data-products/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setDataProduct(null)
            return
          }
          throw new Error("Failed to fetch data product")
        }

        const data = await response.json()
        setDataProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching data product:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDataProduct()
    }
  }, [id])

  return { dataProduct, loading, error }
}
