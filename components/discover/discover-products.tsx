"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ProductCard from "../product-card"

const DiscoverProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/data-products")
        if (response.ok) {
          const data = await response.json()
          setProducts(data.slice(0, 6)) // Show first 6 for discover page
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export { DiscoverProducts }
