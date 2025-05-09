"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getGlossaryTerms } from "@/app/actions/purview-actions"
import type { GlossaryTerm } from "@/lib/purview-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function GlossaryView() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    loadGlossaryTerms()
  }, [])

  async function loadGlossaryTerms() {
    setLoading(true)
    try {
      const response = await getGlossaryTerms(searchQuery)
      setTerms(response.terms)
      setTotalCount(response.totalCount)
    } catch (error) {
      console.error("Error loading glossary terms:", error)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    loadGlossaryTerms()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Glossary</CardTitle>
        <CardDescription>Browse and search business terms from your Purview glossary</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search glossary terms..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="text-sm text-gray-500 mb-4">{loading ? "Loading..." : `${totalCount} terms found`}</div>

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
            {terms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No glossary terms found. Try adjusting your search.</div>
            ) : (
              terms.map((term) => (
                <div key={term.guid} className="border rounded-md p-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-md">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{term.name}</h3>
                      {term.abbreviation && (
                        <p className="text-sm text-gray-500 mt-1">Abbreviation: {term.abbreviation}</p>
                      )}
                      {term.longDescription && <p className="text-sm mt-2">{term.longDescription}</p>}
                      {term.examples && term.examples.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Examples:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {term.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Tag className="h-3 w-3" />
                        <span>{term.status}</span>
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
