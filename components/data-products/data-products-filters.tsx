"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export function DataProductsFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All Products" },
    { id: "analytics", label: "Analytics" },
    { id: "dashboards", label: "Dashboards" },
    { id: "reports", label: "Reports" },
    { id: "visualizations", label: "Visualizations" },
    { id: "apis", label: "APIs" },
  ]

  return (
    <div className="mt-4 flex justify-between">
      <div className="flex space-x-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeFilter === filter.id
                ? "bg-contoso-orange text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </Button>
    </div>
  )
}
