"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DatasetFilters() {
  const [selectedType, setSelectedType] = useState<string>("All Types")
  const [selectedAccess, setSelectedAccess] = useState<string>("All Access")
  const [selectedSort, setSelectedSort] = useState<string>("Most Recent")

  const datasetTypes = [
    "All Types",
    "Tabular Data",
    "Relational",
    "Analytics",
    "Visualization",
    "Documents",
    "Raw Data",
  ]

  const accessTypes = ["All Access", "Public", "Restricted", "Private"]
  const sortOptions = ["Most Recent", "Oldest", "Most Popular", "Highest Usability"]

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>Type: {selectedType}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {datasetTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                className="flex items-center justify-between"
                onClick={() => setSelectedType(type)}
              >
                {type}
                {selectedType === type && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>Access: {selectedAccess}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {accessTypes.map((access) => (
              <DropdownMenuItem
                key={access}
                className="flex items-center justify-between"
                onClick={() => setSelectedAccess(access)}
              >
                {access}
                {selectedAccess === access && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>Sort: {selectedSort}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center justify-between"
                onClick={() => setSelectedSort(option)}
              >
                {option}
                {selectedSort === option && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" className="ml-auto">
        Clear Filters
      </Button>
    </div>
  )
}
