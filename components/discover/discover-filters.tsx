"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, ChevronDown } from "lucide-react"

export function DiscoverFilters() {
  const [sortBy, setSortBy] = useState("popular")

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Access Level</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Public</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Restricted</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Confidential</DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Department</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Risk Management</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Customer Analytics</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Compliance</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Finance</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Operations</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span>
              Sort:{" "}
              {sortBy === "popular"
                ? "Most Popular"
                : sortBy === "recent"
                  ? "Recently Updated"
                  : sortBy === "name"
                    ? "Name (A-Z)"
                    : "Relevance"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem checked={sortBy === "popular"} onCheckedChange={() => setSortBy("popular")}>
            Most Popular
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={sortBy === "recent"} onCheckedChange={() => setSortBy("recent")}>
            Recently Updated
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={sortBy === "name"} onCheckedChange={() => setSortBy("name")}>
            Name (A-Z)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={sortBy === "relevance"} onCheckedChange={() => setSortBy("relevance")}>
            Relevance
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
